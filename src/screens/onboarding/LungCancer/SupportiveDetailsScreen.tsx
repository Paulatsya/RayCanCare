import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Switch,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useColorScheme } from 'react-native';
import { useUser } from '../../../context/UserContext';
import { darkTheme, lightTheme } from '../../../constants/theme';

const SYMPTOMS = [
    'Shortness of breath',
    'Cough',
    'Chest pain',
    'Wheezing',
    'Mucus issues',
];

const SupportiveDetailsScreen = ({ navigation }: any) => {
    const colorScheme = useColorScheme();
    const { colors, font } = colorScheme === 'dark' ? darkTheme : lightTheme;

    const { userInfo, setUserInfo } = useUser();

    const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
    const [breathingAid, setBreathingAid] = useState(false);
    const [breathingExercise, setBreathingExercise] = useState(true);
    const [oxygenSupport, setOxygenSupport] = useState(false);

    const toggleSymptom = (symptom: string) => {
        setSelectedSymptoms((prev) =>
            prev.includes(symptom)
                ? prev.filter((s) => s !== symptom)
                : [...prev, symptom]
        );
    };

    const handleNext = () => {
        setUserInfo((prev: any) => ({
            ...prev,
            supportiveDetails: {
                respiratorySymptoms: selectedSymptoms,
                breathingAid,
                breathingExercise,
                oxygenSupport,
            },
        }));
        // console.log('User Info:', userInfo);
        navigation.navigate('ConsentSummary'); // Replace with actual screen name
    };

    return (
        <ScrollView
            style={{ backgroundColor: colors.background }}
            contentContainerStyle={styles.scrollContent}
        >
            <Animatable.View animation="fadeInUp" duration={500} style={styles.container}>
                <Animatable.View
                    animation="fadeInDown"
                    duration={800}
                    delay={100}
                    style={styles.headerRow}
                >
                    <Text style={[styles.title, { marginTop: 20, color: colors.textPrimary, fontFamily: font.bold }]}>
                        Supportive Details!
                    </Text>
                    <Animatable.Image
                        animation="bounceIn"
                        delay={300}
                        source={require('../../../assets/RaySmileNoBG.png')}
                        style={styles.rayImage}
                    />
                </Animatable.View>

                <Text style={[styles.subText, { color: colors.surface }]}>
                    Let’s understand your current lifestyle and needs.
                </Text>

                <Text style={[styles.sectionTitle, { color: colors.primary }]}>Respiratory symptoms:</Text>
                {SYMPTOMS.map((symptom) => (
                    <Animatable.View
                        key={symptom}
                        animation="fadeIn"
                        duration={400}
                        delay={100}
                    >
                        <TouchableOpacity
                            style={[
                                styles.checkbox,
                                {
                                    borderColor: selectedSymptoms.includes(symptom)
                                        ? colors.primary
                                        : '#ccc',
                                    backgroundColor: selectedSymptoms.includes(symptom)
                                        ? colors.primary + '20'
                                        : 'transparent',
                                },
                            ]}
                            onPress={() => toggleSymptom(symptom)}
                        >
                            <Text style={{ color: colors.textPrimary }}>{symptom}</Text>
                        </TouchableOpacity>
                    </Animatable.View>
                ))}

                <Animatable.View animation="fadeIn" delay={200}>
                    <View style={styles.toggleRow}>
                        <Text style={[styles.label, { color: colors.textPrimary }]}>
                            Breathing aid required?
                        </Text>
                        <Switch value={breathingAid} onValueChange={setBreathingAid} />
                    </View>

                    <View style={styles.toggleRow}>
                        <Text style={[styles.label, { color: colors.textPrimary }]}>
                            Are you doing breathing exercises?
                        </Text>
                        <Switch value={breathingExercise} onValueChange={setBreathingExercise} />
                    </View>

                    {!breathingExercise && (
                        <Text style={[styles.prompt, { color: colors.warning || 'orange' }]}>
                            Try including breathing exercises in your routine!
                        </Text>
                    )}

                    <View style={styles.toggleRow}>
                        <Text style={[styles.label, { color: colors.textPrimary }]}>
                            Are you on oxygen support?
                        </Text>
                        <Switch value={oxygenSupport} onValueChange={setOxygenSupport} />
                    </View>
                </Animatable.View>

                <Animatable.View animation="fadeIn" delay={300}>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: colors.primary }]}
                        onPress={handleNext}
                    >
                        <Text style={{ color: colors.surface }}>Next</Text>
                    </TouchableOpacity>
                </Animatable.View>
            </Animatable.View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContent: {
        paddingBottom: 40,
    },
    container: {
        padding: 20,
    },
    header: {
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 10,
    },
    subText: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        marginBottom: 10,
    },
    checkbox: {
        padding: 12,
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
    },
    toggleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 12,
    },
    label: {
        fontSize: 15,
        flex: 1,
        marginRight: 10,
    },
    prompt: {
        fontSize: 13,
        marginTop: -5,
        marginBottom: 12,
        fontStyle: 'italic',
    },
    button: {
        marginTop: 30,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
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

export default SupportiveDetailsScreen;
