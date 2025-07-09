import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useColorScheme } from 'react-native';
import { useUser } from '../../context/UserContext';
import { useNavigation } from '@react-navigation/native';
import { lightTheme, darkTheme } from '../../constants/theme';
import { Image } from 'react-native';


const BasicInfoScreen: React.FC = ({ navigation }: any) => {
    const { userInfo, setUserInfo } = useUser();
    // const navigation = useNavigation();

    const [firstName, setFirstName] = useState(userInfo?.firstName || '');
    const [lastName, setLastName] = useState(userInfo?.lastName || '');
    const [email, setEmail] = useState(userInfo?.email || '');
    const [gender, setGender] = useState(userInfo?.gender || '');
    const [location, setLocation] = useState(userInfo?.location || '');
    const [preferredLanguage, setPreferredLanguage] = useState(userInfo?.language || 'English');

    // Date selector state
    const today = new Date();
    const [selectedDay, setSelectedDay] = useState(userInfo?.dob ? new Date(userInfo.dob).getDate().toString() : '');
    const [selectedMonth, setSelectedMonth] = useState(userInfo?.dob ? (new Date(userInfo.dob).getMonth() + 1).toString() : '');
    const [selectedYear, setSelectedYear] = useState(userInfo?.dob ? new Date(userInfo.dob).getFullYear().toString() : '');

    const colorScheme = useColorScheme();
    const { colors, font } = colorScheme === 'dark' ? darkTheme : lightTheme;

    const handleSaveInfo = () => {
        const validDate = selectedDay && selectedMonth && selectedYear;
        const dob = validDate ? new Date(`${selectedYear}-${selectedMonth}-${selectedDay}`).toISOString() : '';

        // Update userInfo
        setUserInfo(prev => ({
            ...prev,
            firstName,
            lastName,
            dob,
            email,
            gender,
            location,
            language: preferredLanguage
        }));

        // Check user role and navigate accordingly
        if (userInfo?.role === 'patient') {
            navigation.navigate('HealthHistory');
        } else {
            // Navigate to a different screen if the role is not 'patient'
            // navigation.navigate('OtherScreen');
        }
    };


    const generateNumberArray = (start: number, end: number) => {
        return Array.from({ length: end - start + 1 }, (_, i) => (start + i).toString());
    };

    const days = generateNumberArray(1, 31);
    const months = generateNumberArray(1, 12);
    const years = generateNumberArray(1950, today.getFullYear());

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10, marginTop: 40 }}>
                <Text style={[styles.title, { color: colors.textPrimary, fontFamily: font.bold, marginTop: 10 }]}>
                    Let's Get to Know You!
                </Text>
                <Image
                    source={require('../../assets/RaySmileNoBG.png')}
                    style={{ width: 50, height: 50, marginLeft: 10, borderRadius: 16 }}
                />
            </View>


            <TextInput
                style={[styles.input, { borderColor: colors.primary }]}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="First Name"
                placeholderTextColor={colors.textSecondary}
            />

            <TextInput
                style={[styles.input, { borderColor: colors.primary }]}
                value={lastName}
                onChangeText={setLastName}
                placeholder="Last Name"
                placeholderTextColor={colors.textSecondary}
            />

            <Text style={[styles.subtitle, { color: colors.textPrimary }]}>Date of Birth</Text>
            <View style={styles.dateRow}>
                <Picker
                    selectedValue={selectedDay}
                    style={styles.datePicker}
                    onValueChange={setSelectedDay}
                >
                    <Picker.Item label="DD" value="" />
                    {days.map(day => <Picker.Item key={day} label={day} value={day} />)}
                </Picker>

                <Picker
                    selectedValue={selectedMonth}
                    style={styles.datePicker}
                    onValueChange={setSelectedMonth}
                >
                    <Picker.Item label="MM" value="" />
                    {months.map(month => <Picker.Item key={month} label={month} value={month} />)}
                </Picker>

                <Picker
                    selectedValue={selectedYear}
                    style={styles.datePicker}
                    onValueChange={setSelectedYear}
                >
                    <Picker.Item label="YYYY" value="" />
                    {years.reverse().map(year => <Picker.Item key={year} label={year} value={year} />)}
                </Picker>
            </View>

            <TextInput
                style={[styles.input, { borderColor: colors.primary }]}
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                keyboardType="email-address"
                placeholderTextColor={colors.textSecondary}
            />

            <Picker
                selectedValue={gender}
                style={[styles.input, { color: colors.textPrimary, borderColor: colors.primary }]}
                onValueChange={itemValue => setGender(itemValue)}
            >
                <Picker.Item label="Select Gender" value="" />
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
                <Picker.Item label="Other" value="Other" />
                <Picker.Item label="Prefer not to say" value="Prefer not to say" />
            </Picker>

            <TextInput
                style={[styles.input, { borderColor: colors.primary }]}
                value={location}
                onChangeText={setLocation}
                placeholder="Location (Country)"
                placeholderTextColor={colors.textSecondary}
            />

            <Picker
                selectedValue={preferredLanguage}
                style={[styles.input, { color: colors.textPrimary, borderColor: colors.primary }]}
                onValueChange={itemValue => setPreferredLanguage(itemValue)}
            >
                <Picker.Item label="English" value="English" />
                <Picker.Item label="Hindi" value="Hindi" />
                <Picker.Item label="Other" value="Other" />
            </Picker>

            {/* <View style={styles.communicationContainer}>
                <Text style={[styles.subtitle, { color: colors.textPrimary }]}>Communication Preference</Text>
                <View style={styles.checkboxGroup}>
                    {['Push Notification', 'WhatsApp', 'Email', 'SMS'].map(type => (
                        <TouchableOpacity
                            key={type}
                            onPress={() =>
                                setCommunicationPrefs(prev => ({
                                    ...prev,
                                    [type.toLowerCase().replace(/ /g, '')]: !prev[type.toLowerCase().replace(/ /g, '')]
                                }))
                            }
                            style={styles.checkbox}
                        >
                            <Text style={{ color: colors.textPrimary }}>{type}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View> */}

            <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.primary }]}
                onPress={handleSaveInfo}
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
    input: {
        width: '100%',
        padding: 12,
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 10,
        fontSize: 16,
    },
    subtitle: {
        fontSize: 18,
        marginVertical: 10,
    },
    dateRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    datePicker: {
        flex: 1,
        height: 50,
        marginHorizontal: 5,
        borderRadius: 10, // <-- Add this line
    },

    communicationContainer: {
        width: '100%',
        marginVertical: 10,
    },
    checkboxGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    checkbox: {
        width: '50%',
        padding: 10,
        alignItems: 'center',
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

export default BasicInfoScreen;
