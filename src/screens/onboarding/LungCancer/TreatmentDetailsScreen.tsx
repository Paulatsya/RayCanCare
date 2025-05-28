import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Platform,

} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useUser } from '../../../context/UserContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useColorScheme } from 'react-native';
import { darkTheme, lightTheme } from '../../../constants/theme';

const TreatmentDetailsScreen = ({ navigation }: any) => {
    const { userInfo, setUserInfo } = useUser();
    const selectedTreatments = userInfo?.treatmentPlan?.treatments || [];
    const colorScheme = useColorScheme();
    const { colors, font } = colorScheme === 'dark' ? darkTheme : lightTheme;

    const [formData, setFormData] = useState<any>({});
    const [showDatePicker, setShowDatePicker] = useState<{ field: string; treatment: string } | null>(null);

    const handleChange = (treatment: string, field: string, value: any) => {
        setFormData((prev: any) => ({
            ...prev,
            [treatment]: {
                ...prev[treatment],
                [field]: value,
            },
        }));
    };

    const handleDateChange = (_event: any, selectedDate?: Date) => {
        if (showDatePicker && selectedDate) {
            handleChange(showDatePicker.treatment, showDatePicker.field, selectedDate.toISOString().split('T')[0]);
        }
        setShowDatePicker(null);
    };

    const renderDateInput = (treatment: string, field: string, label: string) => (
        <TouchableOpacity
            onPress={() => setShowDatePicker({ field, treatment })}
            style={[styles.dateInput, { borderColor: colors.primary, backgroundColor: colors.surface }]}
        >
            <Text style={{ color: colors.textPrimary }}>
                {formData[treatment]?.[field] || `Select ${label}`}
            </Text>
        </TouchableOpacity>
    );

    const renderSection = (treatment: string) => {
        switch (treatment) {
            case 'Chemotherapy':
                return (
                    <>
                        {renderDateInput(treatment, 'startDate', 'Start Date')}
                        <InputField
                            label="Frequency"
                            value={formData[treatment]?.frequency || ''}
                            onChange={(text) => handleChange(treatment, 'frequency', text)}
                        />
                        <InputField
                            label="Next Session (optional)"
                            value={formData[treatment]?.nextSession || ''}
                            onChange={(text) => handleChange(treatment, 'nextSession', text)}
                        />
                        <InputField
                            label="Side Effects"
                            value={formData[treatment]?.sideEffects || ''}
                            onChange={(text) => handleChange(treatment, 'sideEffects', text)}
                            multiline
                        />
                    </>
                );
            case 'Radiation Therapy':
                return (
                    <>
                        <InputField
                            label="Body Area"
                            value={formData[treatment]?.area || ''}
                            onChange={(text) => handleChange(treatment, 'area', text)}
                        />
                        <InputField
                            label="No. of Sessions"
                            value={formData[treatment]?.sessions || ''}
                            onChange={(text) => handleChange(treatment, 'sessions', text)}
                            keyboardType="numeric"
                        />
                        <InputField
                            label="Side Effects"
                            value={formData[treatment]?.sideEffects || ''}
                            onChange={(text) => handleChange(treatment, 'sideEffects', text)}
                            multiline
                        />
                    </>
                );
            case 'Surgery':
                return (
                    <>
                        <InputField
                            label="Surgery Type"
                            value={formData[treatment]?.type || ''}
                            onChange={(text) => handleChange(treatment, 'type', text)}
                        />
                        {renderDateInput(treatment, 'date', 'Surgery Date')}
                        <InputField
                            label="Recovery Notes (optional)"
                            value={formData[treatment]?.notes || ''}
                            onChange={(text) => handleChange(treatment, 'notes', text)}
                            multiline
                        />
                    </>
                );
            case 'Immunotherapy':
            case 'Targeted Therapy':
                return (
                    <>
                        <InputField
                            label="Drug Name"
                            value={formData[treatment]?.drug || ''}
                            onChange={(text) => handleChange(treatment, 'drug', text)}
                        />
                        <InputField
                            label="Symptoms / Reactions"
                            value={formData[treatment]?.symptoms || ''}
                            onChange={(text) => handleChange(treatment, 'symptoms', text)}
                            multiline
                        />
                        <InputField
                            label="Schedule"
                            value={formData[treatment]?.schedule || ''}
                            onChange={(text) => handleChange(treatment, 'schedule', text)}
                        />
                    </>
                );
            default:
                return null;
        }
    };

    const handleNext = () => {
        setUserInfo((prev: any) => ({
            ...prev,
            treatmentPlan: {
                ...prev.treatmentPlan,
                details: formData,
            },
        }));
        navigation.navigate('SupportiveDetails');
    };

    return (
        <ScrollView style={{ backgroundColor: colors.background }}>
            <View style={styles.container}>
                <Animatable.View
                    animation="fadeInDown"
                    duration={800}
                    delay={100}
                    style={styles.headerRow}
                >
                    <Text style={[styles.title, { marginTop: 20, color: colors.textPrimary, fontFamily: font.bold }]}>
                        Treatment Details!
                    </Text>
                    <Animatable.Image
                        animation="bounceIn"
                        delay={300}
                        source={require('../../../assets/RaySmileNoBG.png')}
                        style={styles.rayImage}
                    />
                </Animatable.View>

                {selectedTreatments.map((treatment: string) => (
                    <View key={treatment} style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: colors.primary }]}>{treatment}</Text>
                        {renderSection(treatment)}
                    </View>
                ))}

                <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleNext}>
                    <Text style={{ color: colors.surface }}>Next</Text>
                </TouchableOpacity>
            </View>

            {showDatePicker && (
                <DateTimePicker
                    value={new Date()}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'inline' : 'default'}
                    onChange={handleDateChange}
                />
            )}
        </ScrollView>
    );
};

interface InputFieldProps {
    label: string;
    value: string;
    onChange: (text: string) => void;
    multiline?: boolean;
    keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    value,
    onChange,
    multiline = false,
    keyboardType = 'default',
}) => {
    const colorScheme = useColorScheme();
    const { colors } = colorScheme === 'dark' ? darkTheme : lightTheme;

    return (
        <View style={styles.inputWrapper}>
            <Text style={[styles.label, { color: colors.textPrimary }]}>{label}</Text>
            <TextInput
                value={value}
                onChangeText={onChange}
                style={[
                    styles.input,
                    multiline && styles.multilineInput,
                    {
                        borderColor: colors.primary,
                        color: colors.textPrimary,
                        backgroundColor: colors.surface,
                    },
                ]}
                multiline={multiline}
                keyboardType={keyboardType}
                placeholder={`Enter ${label}`}
                placeholderTextColor={colorScheme === 'dark' ? '#888' : '#aaa'}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    header: {
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 20,
    },
    section: {
        marginBottom: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
    },
    inputWrapper: {
        marginBottom: 10,
    },
    label: {
        fontSize: 14,
        marginBottom: 4,
        fontWeight: '500',
    },
    input: {
        borderWidth: 1.5,
        padding: 12,
        borderRadius: 10,
        fontSize: 16,
    },
    multilineInput: {
        height: 80,
        textAlignVertical: 'top',
    },
    dateInput: {
        borderWidth: 1.5,
        padding: 12,
        borderRadius: 10,
        marginBottom: 12,
    },
    button: {
        marginTop: 10,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 30,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
        marginTop: 40,
    },
    rayImage: {
        width: 50,
        height: 50,
        marginLeft: 10,
        borderRadius: 16,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 16,
    },
});

export default TreatmentDetailsScreen;
