from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib

# -------- Load Model and Vectorizer --------
model = joblib.load("severity_predictor.pkl")
vectorizer = joblib.load("issue_vectorizer.pkl")

# -------- Define expected one-hot columns --------
expected_cat_cols = [
    'gender_Female', 'gender_Male',
    'smoking_history_Ex-smoker', 'smoking_history_No', 'smoking_history_Yes',
    'stage_of_cancer_Stage I', 'stage_of_cancer_Stage II', 'stage_of_cancer_Stage III', 'stage_of_cancer_Stage IV',
    'treatment_type_Chemotherapy', 'treatment_type_Immunotherapy',
    'treatment_type_Radiation', 'treatment_type_Targeted Therapy'
]

treatment_suggestions = {
    "Mild": "🧘‍♂ Light yoga, fruits, herbal tea, breathing exercises",
    "Medium": "💊 Bronchodilator, guided meditation, protein-rich food, moderate yoga",
    "Severe": "🏥 Oxygen therapy, corticosteroids, high-calorie diet, stress-relief counseling"
}

# -------- Pydantic model --------
class PatientData(BaseModel):
    age: int
    gender: str
    smoking_history: str
    stage_of_cancer: str
    treatment_type: str
    days_since_treatment: int
    reported_issues: str

# -------- FastAPI App Setup --------
app = FastAPI()

# Enable CORS for React Native app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with frontend domain in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------- Health Check Route --------
@app.get("/")
def read_root():
    return {"message": "✅ FastAPI ML server is running!"}

# -------- Predict Route --------
@app.post("/predict")
def predict(data: PatientData):
    input_df = pd.DataFrame([data.dict()])

    # One-hot encode categorical columns
    cat_cols = ["gender", "smoking_history", "stage_of_cancer", "treatment_type"]
    input_cat = pd.get_dummies(input_df[cat_cols])
    for col in expected_cat_cols:
        if col not in input_cat:
            input_cat[col] = 0
    input_cat = input_cat[expected_cat_cols]

    # Vectorize issues
    issue_vector = vectorizer.transform([data.reported_issues]).toarray()
    issue_df = pd.DataFrame(issue_vector, columns=vectorizer.get_feature_names_out())

    # Final input
    final_input = pd.concat([
        input_df[["age", "days_since_treatment"]].reset_index(drop=True),
        input_cat.reset_index(drop=True),
        issue_df.reset_index(drop=True)
    ], axis=1)

    # Prediction
    severity = model.predict(final_input)[0]
    suggestion = treatment_suggestions.get(severity, "⚠ Consult a specialist")

    return {
        "predicted_severity": severity,
        "suggested_treatment": suggestion
    }