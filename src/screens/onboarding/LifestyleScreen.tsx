import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../../constants/theme';
import { useUser } from '../../context/UserContext';

const LifestyleScreen: React.FC = ({ navigation }: any) => {
    const { userInfo, setUserInfo } = useUser();
    const colorScheme = useColorScheme();
    const { colors, font } = colorScheme === 'dark' ? darkTheme : lightTheme;

    const [smoking, setSmoking] = useState('');
    const [alcohol, setAlcohol] = useState('');
    const [activityLevel, setActivityLevel] = useState('');

    const handleNext = () => {
        setUserInfo(prev => ({
            ...prev,
            lifestyle: {
                smoking,
                alcohol,
                activityLevel,
            },
        }));
        navigation.navigate('SleepDiet' as never);
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 30, marginTop: 40 }}>
                <Text style={[styles.title, { color: colors.textPrimary, fontFamily: font.bold, marginTop: 20 }]}>
                    Your LifeStyle Choices!
                </Text>
                <Image
                    source={require('../../assets/RaySmileNoBG.png')}
                    style={{ width: 50, height: 50, marginLeft: 10, borderRadius: 16 }}
                />
            </View>
            {/* Smoking Dropdown */}
            <Text style={[styles.subtitle, { color: colors.textPrimary }]}>
                Do you smoke?
            </Text>
            <Picker
                selectedValue={smoking}
                style={[styles.input, { borderColor: colors.primary, color: colors.textPrimary }]}
                onValueChange={setSmoking}
            >
                <Picker.Item label="Select one" value="" />
                <Picker.Item label="Rarely" value="Rarely" />
                <Picker.Item label="Never" value="Never" />
                <Picker.Item label="Regularly" value="Regularly" />
            </Picker>


            {/* Alcohol Dropdown */}
            <Text style={[styles.subtitle, { color: colors.textPrimary }]}>
                Do you consume Alcohol?
            </Text>
            <Picker
                selectedValue={alcohol}
                style={[styles.input, { borderColor: colors.primary, color: colors.textPrimary }]}
                onValueChange={setAlcohol}
            >
                <Picker.Item label="Select one" value="" />
                <Picker.Item label="Rarely" value="Rarely" />
                <Picker.Item label="Never" value="Never" />
                <Picker.Item label="Regularly" value="Regularly" />
            </Picker>


            {/* Physical Activity Dropdown */}
            <Text style={[styles.subtitle, { color: colors.textPrimary }]}>
                What is your physical activity level?
            </Text>
            <Picker
                selectedValue={activityLevel}
                style={[styles.input, { borderColor: colors.primary, color: colors.textPrimary }]}
                onValueChange={setActivityLevel}
            >
                <Picker.Item label="Select one" value="" />
                <Picker.Item label="Low" value="Low" />
                <Picker.Item label="Moderate" value="Moderate" />
                <Picker.Item label="High" value="High" />
            </Picker>

            {/* Next Button */}
            <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.primary }]}
                onPress={handleNext}
            >
                <Text style={{ color: colors.surface, fontFamily: font.regular }}>Next</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        marginVertical: 10,
    },
    input: {
        width: '100%',
        padding: 12,
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 10,
        fontSize: 16,
    },
    button: {
        marginTop: 20,
        padding: 15,
        width: '80%',
        alignSelf: 'center',
        borderRadius: 10,
        alignItems: 'center',
    },
});

export default LifestyleScreen;
