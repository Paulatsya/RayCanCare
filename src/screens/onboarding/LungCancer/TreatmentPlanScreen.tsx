import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Switch,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useColorScheme } from 'react-native';
import { useUser } from '../../../context/UserContext';
import { lightTheme, darkTheme } from '../../../constants/theme';
// import { Picker } from '@react-native-picker/picker';
// import DateTimePicker from '@react-native-community/datetimepicker';

const treatmentOptions = [
    'Chemotherapy',
    'Radiation Therapy',
    'Surgery',
    'Immunotherapy',
    'Targeted Therapy',
    // 'Clinical Trial',
    // 'Palliative Care',
    'Don’t Know Yet',
];

const TreatmentPlanScreen: React.FC = ({ navigation }: any) => {
    const { userInfo, setUserInfo } = useUser();
    const colorScheme = useColorScheme();
    const { colors, font } = colorScheme === 'dark' ? darkTheme : lightTheme;

    const [selectedTreatments, setSelectedTreatments] = useState<string[]>([]);
    const [hasStarted, setHasStarted] = useState(false);

    const toggleTreatment = (treatment: string) => {
        setSelectedTreatments(prev =>
            prev.includes(treatment)
                ? prev.filter(item => item !== treatment)
                : [...prev, treatment]
        );
    };

    const handleNext = () => {
        setUserInfo(prev => ({
            ...prev,
            treatmentPlan: {
                treatments: selectedTreatments,
                started: hasStarted,
            },
        }));
        console.log('User Info:', userInfo);
        navigation.navigate('TreatmentDetails'); // replace with actual next screen
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
            <View style={styles.container}>
                <Animatable.View
                    animation="fadeInDown"
                    duration={800}
                    delay={100}
                    style={styles.headerRow}
                >
                    <Text style={[styles.title, { marginTop: 20, color: colors.textPrimary, fontFamily: font.bold }]}>
                        About your treatment Plan!
                    </Text>
                    <Animatable.Image
                        animation="bounceIn"
                        delay={300}
                        source={require('../../../assets/RaySmileNoBG.png')}
                        style={styles.rayImage}
                    />
                </Animatable.View>

                <Animatable.Text
                    animation="fadeIn"
                    delay={400}
                    style={[styles.subtitle, { color: colors.surface, fontFamily: font.regular }]}
                >
                    What has your doctor suggested or started?
                </Animatable.Text>

                <Animatable.View animation="fadeInUp" delay={600}>
                    {/* Multi-select chips */}
                    <View style={styles.chipContainer}>
                        {treatmentOptions.map(option => {
                            const selected = selectedTreatments.includes(option);
                            return (
                                <TouchableOpacity
                                    key={option}
                                    onPress={() => toggleTreatment(option)}
                                    style={[
                                        styles.chip,
                                        {
                                            backgroundColor: selected ? colors.primary : colors.surface,
                                            borderColor: colors.primary,
                                        },
                                    ]}
                                >
                                    <Text style={{ color: selected ? colors.surface : colors.textPrimary }}>
                                        {option}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    {/* Toggle switch */}
                    <View style={styles.switchRow}>
                        <Text style={[styles.switchLabel, { color: colors.textPrimary }]}>
                            {hasStarted ? 'I have started treatment' : 'Planning to start soon'}
                        </Text>
                        <Switch
                            value={hasStarted}
                            onValueChange={setHasStarted}
                            trackColor={{ false: '#ccc', true: colors.primary }}
                            thumbColor={hasStarted ? colors.surface : '#f4f3f4'}
                        />
                    </View>

                    {/* Next button */}
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: colors.primary }]}
                        onPress={handleNext}
                    >
                        <Text style={{ color: colors.surface, fontFamily: font.regular }}>Next</Text>
                    </TouchableOpacity>
                </Animatable.View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
    },
    chip: {
        borderWidth: 1,
        borderRadius: 20,
        paddingVertical: 6,
        paddingHorizontal: 12,
        marginRight: 8,
        marginBottom: 8,
    },
    switchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 20,
    },
    switchLabel: {
        fontSize: 16,
        flex: 1,
        marginRight: 10,
    },
    button: {
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        alignSelf: 'center',
        width: '80%',
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
});

export default TreatmentPlanScreen;
