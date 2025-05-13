import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    useColorScheme,
    Animated,
    Easing
} from 'react-native';
import { useUser } from '../../context/UserContext'; // 👈 Import context
import { lightTheme, darkTheme } from '../../constants/theme';

const RoleSelectionScreen: React.FC = ({ navigation }: any) => {
    const colorScheme = useColorScheme();
    const { colors, font } = colorScheme === 'dark' ? darkTheme : lightTheme;
    const { setUserInfo } = useUser(); // 👈 Use context

    // Animations
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 800,
                easing: Easing.ease,
                useNativeDriver: true,
            })
        ]).start();
    }, [fadeAnim, scaleAnim]);

    const handleSelect = (role: 'patient' | 'caregiver') => {
        setUserInfo((prev) => ({
            ...prev,
            role,
        }));
        navigation.navigate('BasicInfo');
    };


    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Animated Ray image */}
            <Animated.Image
                source={require('../../assets/RaySmileNoBG.png')}
                style={[styles.image, {
                    opacity: fadeAnim,
                    transform: [{ scale: scaleAnim }]
                }]}
            />

            <Text style={[styles.title, { color: colors.textPrimary, fontFamily: font.bold }]}>
                Who are you?
            </Text>

            <TouchableOpacity
                style={[styles.card, { backgroundColor: colors.primary }]}
                onPress={() => handleSelect('patient')}
            >
                <Text style={[styles.cardText, { color: colors.surface, fontFamily: font.regular }]}>
                    🎗️ I am a Patient
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.card, { backgroundColor: colors.primary }]}
                onPress={() => handleSelect('caregiver')}
            >
                <Text style={[styles.cardText, { color: colors.surface, fontFamily: font.regular }]}>
                    👩‍⚕️ I am a Caregiver
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    image: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    card: {
        width: '80%',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
    },
    cardText: {
        fontSize: 18,
    },
});

export default RoleSelectionScreen;
