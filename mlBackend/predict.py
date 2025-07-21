import pandas as pd
import joblib
from sklearn.feature_extraction.text import CountVectorizer

# -------- STEP 1: Load model and vectorizer --------
model = joblib.load("severity_predictor.pkl")
vectorizer = joblib.load("issue_vectorizer.pkl")

# -------- STEP 2: Ask user for input --------
print("🔍 Enter patient details:\n")
age = int(input("Age: "))
gender = input("Gender (Male/Female): ")
smoking = input("Smoking History (Yes/No/Ex-smoker): ")
stage = input("Cancer Stage (Stage I/Stage II/Stage III/Stage IV): ")
treatment = input("Treatment Type (Chemotherapy/Immunotherapy/Radiation/Targeted Therapy): ")
days = int(input("Days Since Treatment: "))
issues = input("Reported Issues (comma-separated): ")

# -------- STEP 3: Preprocess Input --------
new_patient = {
    "age": age,
    "gender": gender,
    "smoking_history": smoking,
    "stage_of_cancer": stage,
    "treatment_type": treatment,
    "days_since_treatment": days,
    "reported_issues": issues
}

# Encode categorical variables
input_df = pd.DataFrame([new_patient])
cat_cols = ["gender", "smoking_history", "stage_of_cancer", "treatment_type"]
input_cat = pd.get_dummies(input_df[cat_cols])

# Manually align column structure
expected_cat_cols = [
    'gender_Female', 'gender_Male',
    'smoking_history_Ex-smoker', 'smoking_history_No', 'smoking_history_Yes',
    'stage_of_cancer_Stage I', 'stage_of_cancer_Stage II', 'stage_of_cancer_Stage III', 'stage_of_cancer_Stage IV',
    'treatment_type_Chemotherapy', 'treatment_type_Immunotherapy', 'treatment_type_Radiation', 'treatment_type_Targeted Therapy'
]
for col in expected_cat_cols:
    if col not in input_cat:
        input_cat[col] = 0
input_cat = input_cat[expected_cat_cols]  # Ensure column order

# Vectorize text issues
issue_vector = vectorizer.transform([issues]).toarray()
issue_df = pd.DataFrame(issue_vector, columns=vectorizer.get_feature_names_out())

# Combine all
final_input = pd.concat([
    input_df[["age", "days_since_treatment"]].reset_index(drop=True),
    input_cat.reset_index(drop=True),
    issue_df.reset_index(drop=True)
], axis=1)

# -------- STEP 4: Predict --------
predicted_severity = model.predict(final_input)[0]

# -------- STEP 5: Suggest treatment based on severity --------
treatment_suggestions = {
    "Mild": "🧘‍♂ Light yoga, fruits, herbal tea, breathing exercises",
    "Medium": "💊 Bronchodilator, guided meditation, protein-rich food, moderate yoga",
    "Severe": "🏥 Oxygen therapy, corticosteroids, high-calorie diet, stress-relief counseling"
}
suggested_treatment = treatment_suggestions.get(predicted_severity, "Consult a specialist")

# -------- STEP 6: Output --------
print("\n📋 Predicted Symptom Severity:", predicted_severity)
print("💡 Suggested Treatment Plan:", suggested_treatment)