# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import pandas as pd
# import joblib

# # Load model and vectorizer
# model = joblib.load("severity_predictor.pkl")
# vectorizer = joblib.load("issue_vectorizer.pkl")

# # Flask setup
# app = Flask(__name__)
# CORS(app)

# # Expected columns from training
# expected_cat_cols = [
#     'gender_Female', 'gender_Male',
#     'smoking_history_Ex-smoker', 'smoking_history_No', 'smoking_history_Yes',
#     'stage_of_cancer_Stage I', 'stage_of_cancer_Stage II', 'stage_of_cancer_Stage III', 'stage_of_cancer_Stage IV',
#     'treatment_type_Chemotherapy', 'treatment_type_Immunotherapy', 'treatment_type_Radiation', 'treatment_type_Targeted Therapy'
# ]

# # Treatment suggestions
# treatment_suggestions = {
#     "Mild": "🧘‍♂ Light yoga, fruits, herbal tea, breathing exercises",
#     "Medium": "💊 Bronchodilator, guided meditation, protein-rich food, moderate yoga",
#     "Severe": "🏥 Oxygen therapy, corticosteroids, high-calorie diet, stress-relief counseling"
# }

# @app.route("/predict", methods=["POST"])
# def predict():
#     data = request.json

#     # Convert to DataFrame
#     input_df = pd.DataFrame([data])

#     # One-hot encode categorical features
#     cat_cols = ["gender", "smoking_history", "stage_of_cancer", "treatment_type"]
#     input_cat = pd.get_dummies(input_df[cat_cols])
#     for col in expected_cat_cols:
#         if col not in input_cat:
#             input_cat[col] = 0
#     input_cat = input_cat[expected_cat_cols]  # fix order

#     # Vectorize issues
#     issue_vector = vectorizer.transform([data["reported_issues"]]).toarray()
#     issue_df = pd.DataFrame(issue_vector, columns=vectorizer.get_feature_names_out())

#     # Combine all features
#     final_input = pd.concat([
#         input_df[["age", "days_since_treatment"]].reset_index(drop=True),
#         input_cat.reset_index(drop=True),
#         issue_df.reset_index(drop=True)
#     ], axis=1)

#     # Predict
#     severity = model.predict(final_input)[0]
#     suggestion = treatment_suggestions.get(severity, "Consult a specialist")

#     return jsonify({
#         "predicted_severity": severity,
#         "suggested_treatment": suggestion
#     })

# if __name__ == "_main_":
#     app.run(debug=True)
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import pandas as pd
# import joblib

# # -------- Flask Setup --------
# app = Flask(__name__)
# CORS(app)  # Allow React Native to make requests

# # -------- Load Model and Vectorizer --------
# model = joblib.load("severity_predictor.pkl")
# vectorizer = joblib.load("issue_vectorizer.pkl")

# # -------- Expected One-Hot Encoded Columns --------
# expected_cat_cols = [
#     'gender_Female', 'gender_Male',
#     'smoking_history_Ex-smoker', 'smoking_history_No', 'smoking_history_Yes',
#     'stage_of_cancer_Stage I', 'stage_of_cancer_Stage II', 'stage_of_cancer_Stage III', 'stage_of_cancer_Stage IV',
#     'treatment_type_Chemotherapy', 'treatment_type_Immunotherapy',
#     'treatment_type_Radiation', 'treatment_type_Targeted Therapy'
# ]

# # -------- Treatment Suggestions --------
# treatment_suggestions = {
#     "Mild": "🧘‍♂ Light yoga, fruits, herbal tea, breathing exercises",
#     "Medium": "💊 Bronchodilator, guided meditation, protein-rich food, moderate yoga",
#     "Severe": "🏥 Oxygen therapy, corticosteroids, high-calorie diet, stress-relief counseling"
# }

# # -------- Predict Endpoint --------
# @app.route("/predict", methods=["POST"])
# def predict():
#     try:
#         data = request.get_json()

#         # Convert input to DataFrame
#         input_df = pd.DataFrame([data])

#         # One-hot encode categorical features
#         cat_cols = ["gender", "smoking_history", "stage_of_cancer", "treatment_type"]
#         input_cat = pd.get_dummies(input_df[cat_cols])

#         # Align one-hot columns to expected model format
#         for col in expected_cat_cols:
#             if col not in input_cat:
#                 input_cat[col] = 0
#         input_cat = input_cat[expected_cat_cols]  # fix order

#         # Vectorize reported issues
#         issue_vector = vectorizer.transform([data.get("reported_issues", "")]).toarray()
#         issue_df = pd.DataFrame(issue_vector, columns=vectorizer.get_feature_names_out())

#         # Combine all features
#         final_input = pd.concat([
#             input_df[["age", "days_since_treatment"]].reset_index(drop=True),
#             input_cat.reset_index(drop=True),
#             issue_df.reset_index(drop=True)
#         ], axis=1)

#         # Predict severity
#         severity = model.predict(final_input)[0]
#         suggestion = treatment_suggestions.get(severity, "⚠ Consult a specialist")

#         return jsonify({
#             "predicted_severity": severity,
#             "suggested_treatment": suggestion
#         })

#     except Exception as e:
#         return jsonify({"error": str(e)}), 400

# # -------- Start Server --------
# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=8081, debug=True)


from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib

app = Flask(__name__)
CORS(app)

# Load your model and vectorizer
model = joblib.load("severity_predictor.pkl")
vectorizer = joblib.load("issue_vectorizer.pkl")

# Expected one-hot encoded columns
expected_cat_cols = [
    'gender_Female', 'gender_Male',
    'smoking_history_Ex-smoker', 'smoking_history_No', 'smoking_history_Yes',
    'stage_of_cancer_Stage I', 'stage_of_cancer_Stage II', 'stage_of_cancer_Stage III', 'stage_of_cancer_Stage IV',
    'treatment_type_Chemotherapy', 'treatment_type_Immunotherapy',
    'treatment_type_Radiation', 'treatment_type_Targeted Therapy'
]

# Treatment suggestions
treatment_suggestions = {
    "Mild": "🧘‍♂ Light yoga, fruits, herbal tea, breathing exercises",
    "Medium": "💊 Bronchodilator, guided meditation, protein-rich food, moderate yoga",
    "Severe": "🏥 Oxygen therapy, corticosteroids, high-calorie diet, stress-relief counseling"
}

# Test route to check if server is running
@app.route("/", methods=["GET"])
def health_check():
    return "✅ Flask model API is running on port 8081"

# Prediction route
@app.route("/predict", methods=["GET"])
def predict():
    data = request.get_json()

    # Convert input to DataFrame
    input_df = pd.DataFrame([data])

    # One-hot encode categorical data
    cat_cols = ["gender", "smoking_history", "stage_of_cancer", "treatment_type"]
    input_cat = pd.get_dummies(input_df[cat_cols])
    for col in expected_cat_cols:
        if col not in input_cat:
            input_cat[col] = 0
    input_cat = input_cat[expected_cat_cols]  # fix order

    # Vectorize issues
    issue_vector = vectorizer.transform([data.get("reported_issues", "")]).toarray()
    issue_df = pd.DataFrame(issue_vector, columns=vectorizer.get_feature_names_out())

    # Combine features
    final_input = pd.concat([
        input_df[["age", "days_since_treatment"]].reset_index(drop=True),
        input_cat.reset_index(drop=True),
        issue_df.reset_index(drop=True)
    ], axis=1)

    # Predict
    severity = model.predict(final_input)[0]
    suggestion = treatment_suggestions.get(severity, "⚠ Consult a specialist")

    return jsonify({
        "predicted_severity": severity,
        "suggested_treatment": suggestion
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8081, debug=True)