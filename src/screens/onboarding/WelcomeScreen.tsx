import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { useColorScheme } from 'react-native'; // Import useColorScheme
import { lightTheme, darkTheme } from '../../constants/theme'; // Import both themes

export default function WelcomeScreen() {
    const navigation = useNavigation<any>();
    const scheme = useColorScheme(); // Get the system color scheme (light or dark)

    // Choose the appropriate theme based on the system preference
    const theme = scheme === 'dark' ? darkTheme : lightTheme;

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Animatable.View animation="fadeInDown" style={styles.imageContainer}>
                <Image
                    source={require('../../assets/RayWaving.jpeg')}
                    style={styles.image}
                    resizeMode="contain"
                />
            </Animatable.View>

            <Animatable.Text animation="fadeInUp" delay={300} style={[styles.title, { color: theme.colors.textPrimary }]}>
                Hi, I am Ray! 💜
            </Animatable.Text>

            <Animatable.View animation="fadeInUp" delay={600}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: theme.colors.secondary }]}
                    onPress={() => navigation.navigate('RoleSelection')} // Navigate to RoleSelection
                >
                    <Text style={[styles.buttonText, { color: theme.colors.textPrimary }]}>Get Started</Text>
                </TouchableOpacity>
            </Animatable.View>
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
    imageContainer: {
        width: '100%',
        alignItems: 'center',
    },
    image: {
        width: 250,
        height: 250,
    },
    title: {
        fontSize: 22,
        textAlign: 'center',
        marginTop: 20,
        fontWeight: 'bold',
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 25,
        marginTop: 30,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
    },
});
