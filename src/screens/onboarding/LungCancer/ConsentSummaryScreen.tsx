import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { Checkbox } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import { lightTheme } from "../../../constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth } from "firebase/auth";
import { saveUserData } from "../../../services/firestorefunctions";
import { useUser } from "../../../context/UserContext";

const rayImage = require("../../../assets/RayConsent.png");

const ConsentScreen = ({ navigation }: any) => {
  const [consent, setConsent] = useState(false);
  const theme = lightTheme;
  const { userInfo } = useUser();

  const handleConsent = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) throw new Error("User not authenticated");

      await saveUserData(user.uid, userInfo); // Save to Firestore
      await AsyncStorage.setItem("@hasOnboarded", "true"); // Mark onboarding complete

      navigation.replace("ReadyToTalk"); // Proceed
    } catch (err) {
      console.error("Consent error:", err);
      Alert.alert("Error", "Something went wrong while saving your data.");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Animatable.Image
        source={rayImage}
        style={styles.rayImage}
        animation="pulse"
        iterationCount="infinite"
        easing="ease-in-out"
        duration={2000}
      />

      <Text style={[styles.title, { color: theme.colors.textPrimary, fontFamily: theme.font.bold }]}>
        We need your consent!
      </Text>

      <Text style={[styles.dataUseText, { color: theme.colors.surface, fontFamily: theme.font.regular }]}>
        Your data is used only within this app to personalize your experience and will never be shared externally.
      </Text>

      <View style={styles.checkboxContainer}>
        <Checkbox
          status={consent ? "checked" : "unchecked"}
          onPress={() => setConsent(!consent)}
          color={theme.colors.primary}
        />
        <Text style={[styles.checkboxLabel, { color: theme.colors.textPrimary, fontFamily: theme.font.regular }]}>
          I consent to the use of my data for personalization.
        </Text>
      </View>

      <Animatable.View animation="fadeInUp" duration={600} delay={100}>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: consent ? theme.colors.primary : theme.colors.disabled },
          ]}
          onPress={handleConsent}
          disabled={!consent}
        >
          <Text style={[styles.buttonText, { fontFamily: theme.font.bold }]}>Continue</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  rayImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 12,
  },
  dataUseText: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 32,
    fontStyle: "italic",
    opacity: 0.8,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16,
    flexShrink: 1,
  },
  button: {
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ConsentScreen;
