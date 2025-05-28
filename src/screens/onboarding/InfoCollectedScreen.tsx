import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useColorScheme } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { lightTheme, darkTheme } from '../../constants/theme';

const InfoCollectedScreen: React.FC = ({ navigation }: any) => {

    const colorScheme = useColorScheme();
    const { colors, font } = colorScheme === 'dark' ? darkTheme : lightTheme;

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Animatable.Text
                animation="fadeInDown"
                style={[styles.title, { color: colors.surface, fontFamily: font.bold }]}
            >
                Yay!
            </Animatable.Text>

            <Animatable.Text
                animation="fadeInUp"
                delay={400}
                style={[styles.subtitle, { marginTop: 15, color: colors.primary, fontFamily: font.regular }]}
            >
                Health history collected. On to the next step...
            </Animatable.Text>

            <Animatable.Image
                animation="zoomIn"
                delay={700}
                source={require('../../assets/RayWideSmile.png')} // ← replace with your actual image path
                style={styles.image}
            />

            <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.primary }]}
                onPress={() => navigation.navigate('CancerTypeSelection')} // ← replace with actual next screen
            >
                <Text style={{ color: colors.surface, fontFamily: font.regular }}>
                    Continue
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    image: {
        width: 250,
        height: 250,
        marginBottom: 40,
        resizeMode: 'contain',
        borderRadius: 20,
    },
    button: {
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 12,
    },
});

export default InfoCollectedScreen;
