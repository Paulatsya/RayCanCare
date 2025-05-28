import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import { lightTheme } from "../../../constants/theme";
import { useUser } from '../../../context/UserContext'; // Adjust the path if needed

const raySaluting = require("../../../assets/RaySalute.png");

const ReadyToTalkScreen = ({ navigation }: any) => {
    const theme = lightTheme;
    const { userInfo, setUserInfo } = useUser();
    console.log('User Info:', userInfo);

    return (

        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Animatable.Image
                source={raySaluting}
                style={styles.rayImage}
                animation="fadeIn"
                // iterationCount="infinite"
                easing="ease-in-out"
                duration={2000}
            />
            <Text style={[styles.title, { color: theme.colors.textPrimary, fontFamily: theme.font.bold }]}>
                Ray is ready to talk!
            </Text>
            <Text style={[styles.message, { color: theme.colors.surface, fontFamily: theme.font.regular }]}>
                It was nice knowing you. {"\n"}
                I’m ready to chat whenever you are!
            </Text>
            {/* console.log('User Info:', userInfo); */}
            <TouchableOpacity
                style={[styles.button, { backgroundColor: theme.colors.primary }]}
                onPress={() => navigation.navigate("ChatScreen")}
            >
                <Text style={[styles.buttonText, { fontFamily: theme.font.bold }]}>Talk to Ray</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, { backgroundColor: theme.colors.secondary, marginTop: 12 }]}
                onPress={() => navigation.navigate("HomeScreen")}
            >
                <Text style={[styles.buttonText, { fontFamily: theme.font.bold, color: theme.colors.textPrimary }]}>
                    Go to My Home Screen
                </Text>
            </TouchableOpacity>
        </View>
    );


};

export default ReadyToTalkScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: "center",
        alignItems: "center",
    },
    rayImage: {
        width: 230,
        height: 230,
        marginBottom: 24,
    },
    title: {
        fontSize: 28,
        textAlign: "center",
        marginBottom: 12,
    },
    message: {
        fontSize: 16,
        textAlign: "center",
        lineHeight: 22,
        fontStyle: "italic",
        opacity: 0.8,
        marginBottom: 32,
    },
    button: {
        paddingVertical: 14,
        paddingHorizontal: 36,
        borderRadius: 10,
        alignItems: "center",
        width: "80%",
    },
    buttonText: {
        fontSize: 16,
        color: "#fff",
    },
});
