import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
import joblib

# STEP 1: Load your CSV
df = pd.read_csv("lung_dataset.csv")

# STEP 2: Split features (X) and label (y)
X = df.drop(columns=["symptom_severity", "suggested_treatment"])
y = df["symptom_severity"]

# STEP 3: Encode categorical features
categorical_cols = ["gender", "smoking_history", "stage_of_cancer", "treatment_type"]
X_cat = pd.get_dummies(X[categorical_cols])

# STEP 4: Encode text from 'reported_issues'
vectorizer = CountVectorizer()
X_issues = vectorizer.fit_transform(X["reported_issues"]).toarray()
X_issues_df = pd.DataFrame(X_issues, columns=vectorizer.get_feature_names_out())

# STEP 5: Combine everything
X_final = pd.concat([
    X[["age", "days_since_treatment"]].reset_index(drop=True),
    X_cat.reset_index(drop=True),
    X_issues_df.reset_index(drop=True)
], axis=1)

# STEP 6: Split into train and test sets
X_train, X_test, y_train, y_test = train_test_split(X_final, y, test_size=0.2, random_state=42)

# STEP 7: Train the model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# STEP 8: Evaluate model
y_pred = model.predict(X_test)
print("Classification Report:\n")
print(classification_report(y_test, y_pred))

# STEP 9: Save the model
joblib.dump(model, "severity_predictor.pkl")
joblib.dump(vectorizer, "issue_vectorizer.pkl")

print("\n✅ Model and vectorizer saved successfully!")