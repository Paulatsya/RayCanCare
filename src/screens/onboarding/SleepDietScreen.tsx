import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../../constants/theme';
import { useUser } from '../../context/UserContext';

const SleepDietScreen: React.FC = ({ navigation }: any) => {
    const { userInfo, setUserInfo } = useUser();
    const colorScheme = useColorScheme();
    const { colors, font } = colorScheme === 'dark' ? darkTheme : lightTheme;

    const [sleepHours, setSleepHours] = useState(6);
    const [dietaryRestrictions, setDietaryRestrictions] = useState('');
    const [hasDietaryRestrictions, setHasDietaryRestrictions] = useState('');// State to track dietary restrictions

    const handleSave = () => {
        setUserInfo(prev => ({
            ...prev,
            sleepHours,
            dietaryRestrictions: hasDietaryRestrictions ? dietaryRestrictions : '', // Save the dietary restrictions if yes
        }));
        console.log('User Info:', userInfo);
        navigation.navigate('InfoCollected');
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <Text style={[styles.title, { marginTop: 20, color: colors.textPrimary, fontFamily: font.bold }]}>
                    Sleep And Diet!
                </Text>
                <Image
                    source={require('../../assets/RaySmileNoBG.png')}
                    style={styles.image}
                />
            </View>

            <Text style={[styles.subtitle, { color: colors.textPrimary }]}>
                How many hours do you sleep in a day?
            </Text>
            <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={12}
                step={1}
                value={sleepHours}
                onValueChange={setSleepHours}
                minimumTrackTintColor={colors.primary}
                maximumTrackTintColor={colors.textSecondary}
                thumbTintColor={colors.primary}
            />
            <Text style={[styles.sliderValue, { color: colors.textPrimary }]}>
                {sleepHours} hrs
            </Text>

            <Text style={[styles.subtitle, { color: colors.textPrimary }]}>
                Do you have any dietary restrictions?
            </Text>
            <Picker
                selectedValue={hasDietaryRestrictions}
                style={[styles.input, { borderColor: colors.primary, color: colors.textPrimary }]}
                onValueChange={(value) => setHasDietaryRestrictions(value)}
            >
                <Picker.Item label="Select one" value="" />
                <Picker.Item label="No" value="No" />
                <Picker.Item label="Yes" value="Yes" />
            </Picker>

            {hasDietaryRestrictions === 'Yes' && (
                <TextInput
                    style={[styles.input, { borderColor: colors.primary }]}
                    value={dietaryRestrictions}
                    onChangeText={setDietaryRestrictions}
                    placeholder="Please provide dietary restrictions (Optional)"
                    placeholderTextColor={colors.textSecondary}
                />
            )}

            <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.primary }]}
                onPress={handleSave}
            >
                <Text style={{ color: colors.surface, fontFamily: font.regular }}>Save</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
        marginTop: 40,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    image: {
        width: 50,
        height: 50,
        marginLeft: 10,
        borderRadius: 16,
    },
    subtitle: {
        fontSize: 18,
        marginVertical: 10,
    },
    slider: {
        width: '100%',
        height: 40,
        marginTop: 20,
    },
    sliderValue: {
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 20,
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

export default SleepDietScreen;
