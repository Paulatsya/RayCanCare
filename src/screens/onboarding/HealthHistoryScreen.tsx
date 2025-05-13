import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
} from 'react-native';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../../constants/theme';
import { useUser } from '../../context/UserContext';

const HealthHistoryScreen: React.FC = ({ navigation }: any) => {
    const { userInfo, setUserInfo } = useUser();
    const colorScheme = useColorScheme();
    const { colors, font } = colorScheme === 'dark' ? darkTheme : lightTheme;

    const [healthConditions, setHealthConditions] = useState<string[]>(userInfo?.healthConditions || []);
    const [otherCondition, setOtherCondition] = useState('');
    const [onMedication, setOnMedication] = useState<boolean | null>(userInfo?.onMedication ?? null);
    const [medicationDetails, setMedicationDetails] = useState(userInfo?.medicationDetails || '');
    const [hasAllergies, setHasAllergies] = useState<boolean | null>(userInfo?.hasAllergies ?? null);
    const [allergyDetails, setAllergyDetails] = useState(userInfo?.allergyDetails || '');



    const handleToggleRadio = (current: boolean | null, setter: (val: boolean | null) => void) => {
        setter(current === true ? null : true);
    };

    const handleToggleCondition = (condition: string) => {
        setHealthConditions(prev => {
            if (condition === 'None') {
                return prev.includes('None') ? [] : ['None'];
            } else {
                const newConditions = prev.filter(item => item !== 'None');
                return newConditions.includes(condition)
                    ? newConditions.filter(item => item !== condition)
                    : [...newConditions, condition];
            }
        });
    };


    const handleNext = () => {
        let updatedConditions = [...healthConditions];

        if (updatedConditions.includes('Other')) {
            if (otherCondition.trim()) {
                updatedConditions = updatedConditions
                    .filter(cond => cond !== 'Other')
                    .concat(otherCondition.trim());
            } else {
                // If "Other" selected but no input, keep "Other"
                updatedConditions = updatedConditions;
            }
        }
        // console.log('updatedConditions:', updatedConditions);
        setUserInfo(prev => ({
            ...prev,
            healthConditions: updatedConditions,
            allergyDetails: hasAllergies ? allergyDetails : '',
            onMedication,
            medicationDetails: onMedication ? medicationDetails : '',
        }));


        navigation.navigate('Lifestyle' as never);
    };



    return (
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 30, marginTop: 40 }}>
                <Text style={[styles.title, { color: colors.textPrimary, fontFamily: font.bold, marginTop: 5 }]}>
                    Your Health History!
                </Text>
                <Image
                    source={require('../../assets/RaySmileNoBG.png')}
                    style={{ width: 50, height: 50, marginLeft: 10, borderRadius: 16 }}
                />
            </View>

            {/* Health Conditions */}
            <Text style={[styles.subtitle, { color: colors.textPrimary }]}>
                Do you have any existing health conditions?
            </Text>

            <View style={styles.chipContainer}>
                {['Diabetes', 'BP', 'Thyroid', 'None', 'Other'].map(condition => (
                    <TouchableOpacity
                        key={condition}
                        style={[
                            styles.chip,
                            healthConditions.includes(condition) && styles.chipSelected,
                        ]}
                        onPress={() => handleToggleCondition(condition)}
                    >
                        <Text style={styles.chipText}>{condition}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {healthConditions.includes('Other') && (
                <TextInput
                    style={[styles.input, { borderColor: colors.primary, color: colors.textPrimary }]}
                    value={otherCondition}
                    onChangeText={setOtherCondition}
                    placeholder="Please specify the condition"
                    placeholderTextColor={colors.textSecondary}
                />
            )}

            {/* Medication Question */}
            <Text style={[styles.subtitle, { color: colors.textPrimary }]}>
                Are you currently taking any medication?
            </Text>
            <View style={styles.buttonGroup}>
                <TouchableOpacity
                    style={[
                        styles.booleanButton,
                        onMedication === true && styles.selectedButton,
                    ]}
                    onPress={() => setOnMedication(onMedication === true ? null : true)}
                >
                    <Text style={{ color: colors.textPrimary }}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.booleanButton,
                        onMedication === false && styles.selectedButton,
                    ]}
                    onPress={() => setOnMedication(onMedication === false ? null : false)}
                >
                    <Text style={{ color: colors.textPrimary }}>No</Text>
                </TouchableOpacity>
            </View>

            {onMedication && (
                <TextInput
                    style={[styles.input, { borderColor: colors.primary, color: colors.textPrimary }]}
                    value={medicationDetails}
                    onChangeText={setMedicationDetails}
                    placeholder="Please specify your medication"
                    placeholderTextColor={colors.textSecondary}
                />
            )}

            {/* Allergy Question */}
            <Text style={[styles.subtitle, { color: colors.textPrimary }]}>
                Do you have any allergies?
            </Text>
            <View style={styles.buttonGroup}>
                <TouchableOpacity
                    style={[
                        styles.booleanButton,
                        hasAllergies === true && styles.selectedButton,
                    ]}
                    onPress={() => setHasAllergies(hasAllergies === true ? null : true)}
                >
                    <Text style={{ color: colors.textPrimary }}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.booleanButton,
                        hasAllergies === false && styles.selectedButton,
                    ]}
                    onPress={() => setHasAllergies(hasAllergies === false ? null : false)}
                >
                    <Text style={{ color: colors.textPrimary }}>No</Text>
                </TouchableOpacity>
            </View>

            {hasAllergies && (
                <TextInput
                    style={[styles.input, { borderColor: colors.primary, color: colors.textPrimary }]}
                    value={allergyDetails}
                    onChangeText={setAllergyDetails}
                    placeholder="Please specify your allergies"
                    placeholderTextColor={colors.textSecondary}
                />
            )}

            <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.primary }]}
                onPress={handleNext}
            >
                <Text style={{ color: colors.surface, fontFamily: font.regular }}>Next</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingBottom: 60,
        flexGrow: 1,
    },
    title: {
        fontSize: 22,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 10,
    },
    input: {
        width: '100%',
        padding: 12,
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 10,
        fontSize: 15,
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10,
    },
    chip: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        margin: 5,
        borderRadius: 20,
        backgroundColor: '#e0e0e0',
    },
    chipText: {
        color: '#000',
    },
    chipSelected: {
        backgroundColor: '#6200ee',
    },
    button: {
        marginTop: 30,
        padding: 15,
        width: '80%',
        alignSelf: 'center',
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    booleanButton: {
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderWidth: 1,
        borderRadius: 8,
    },
    selectedButton: {
        backgroundColor: '#ADD8E6',
    },
});

export default HealthHistoryScreen;
