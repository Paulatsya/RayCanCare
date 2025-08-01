import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../../../constants/theme';
import { getTreatmentPrediction } from '../../../services/modelApi'; // adjust path if needed
import { useUser } from "../../../context/UserContext";

function calculateDaysSince(dateStr?: string): number {
  if (!dateStr) return 0;
  const treatmentDate = new Date(dateStr);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - treatmentDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

const calculateAge = (dob: Date) => {
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    return age;
};


export default function ReadyToTalkScreen() {
  const navigation = useNavigation<any>();
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;

  const [loading, setLoading] = React.useState(false);

  const handleFinish = async () => {
    try {
      await AsyncStorage.setItem('@hasOnboarded', 'true');
      navigation.replace('Chatbot');
    } catch (error) {
      console.error('Failed to save onboarding status:', error);
    }
  };
  const { userInfo } = useUser();
  const handlePredict = async () => {
    setLoading(true);

    try {
      // Example: replace with real stored data or form inputs
      const data = {
        age: isNaN(Number(userInfo.age)) ? 0 : Number(userInfo.age),
        gender: userInfo.gender,
        smoking_history: userInfo.smokingStatus?? "No",
        stage_of_cancer: userInfo.lungCancerDetails?.stage,
        treatment_type: userInfo.treatmentPlan?.treatments?.[0], // assuming one primary treatment
        days_since_treatment: Number(calculateDaysSince(
          userInfo.treatmentPlan?.details?.Chemotherapy?.startDate
        )),
        reported_issues: userInfo.supportiveDetails?.respiratorySymptoms?.join(",") || "",
      };
      console.log("Sending payload:", JSON.stringify(data, null, 2));
      const result = await getTreatmentPrediction(data);

      navigation.navigate('PredictionResult', {
        severity: result.predicted_severity,
        suggestion: result.suggested_treatment,
      });
    } catch (error) {
      console.error('Prediction error:', error);
      Alert.alert('Error', 'Failed to get prediction. Check connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.textPrimary }]}>You're all set!</Text>
      <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
        Tap below to start chatting with Ray or check your symptoms.
      </Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.secondary }]}
        onPress={handleFinish}
      >
        <Text style={[styles.buttonText, { color: theme.colors.textPrimary }]}>Talk to Ray</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.secondary }]}
        onPress={handlePredict}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={theme.colors.secondary} />
        ) : (
          <Text style={[styles.buttonText, { color: theme.colors.textPrimary }]}>Check My Symptoms</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 30,
    marginBottom: 12,
  },
  buttonAlt: {
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 30,
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
      