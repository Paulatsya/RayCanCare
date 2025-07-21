import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Animatable from 'react-native-animatable';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../../../constants/theme';
import { useUser } from '../../../context/UserContext';

const mutationOptions = ['EGFR', 'ALK', 'ROS1', 'KRAS', 'Don’t Know'];

const LungCancerDetailsScreen: React.FC = ({ navigation }: any) => {
    const { userInfo, setUserInfo } = useUser();
    const colorScheme = useColorScheme();
    const { colors, font } = colorScheme === 'dark' ? darkTheme : lightTheme;

    const [diagnosisDate, setDiagnosisDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [stage, setStage] = useState('');
    const [lungCancerType, setCancerType] = useState('');
    const [selectedMutations, setSelectedMutations] = useState<string[]>([]);

    const toggleMutation = (mutation: string) => {
        setSelectedMutations(prev =>
            prev.includes(mutation)
                ? prev.filter(item => item !== mutation)
                : [...prev, mutation]
        );
    };

    const handleNext = () => {
        setUserInfo(prev => ({
            ...prev,
            lungCancerDetails: {
                diagnosisDate,
                stage,
                lungCancerType,
                mutations: selectedMutations,
            },
        }));
        // console.log('User Info:', userInfo);
        navigation.navigate('TreatmentPlan');
        // Adjust route as needed
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
            <View style={styles.container}>
                {/* Header */}
                <Animatable.View
                    animation="fadeInDown"
                    duration={800}
                    delay={100}
                    style={styles.headerRow}
                >
                    <Text style={[styles.title, { color: colors.textPrimary, fontFamily: font.bold }]}>
                        Lung Cancer Details
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
                    duration={600}
                    delay={500}
                    style={[styles.subtitle, { color: colors.textPrimary, fontFamily: font.regular }]}
                >
                    Let’s understand your diagnosis better!
                </Animatable.Text>

                <Animatable.View animation="fadeInUp" delay={600} duration={700}>
                    {/* Diagnosis Date */}
                    <Text style={[styles.label, { color: colors.textPrimary }]}>
                        When were you diagnosed with lung cancer?
                    </Text>
                    <TouchableOpacity
                        onPress={() => setShowDatePicker(true)}
                        style={[styles.dateButton, { borderColor: colors.primary }]}
                    >
                        <Text style={{ color: colors.textPrimary }}>
                            {diagnosisDate.toDateString()}
                        </Text>
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            value={diagnosisDate}
                            mode="date"
                            display="default"
                            onChange={(event, selectedDate) => {
                                setShowDatePicker(false);
                                if (selectedDate) setDiagnosisDate(selectedDate);
                            }}
                        />
                    )}

                    {/* Stage Picker */}
                    <Text style={[styles.label, { color: colors.textPrimary }]}>
                        What stage were you diagnosed with?
                    </Text>
                    <View style={[styles.pickerWrapper, { borderColor: colors.primary }]}>
                        <Picker
                            selectedValue={stage}
                            style={{ color: colors.textPrimary }}
                            onValueChange={setStage}
                        >

                            <Picker.Item label="Select Stage" value="" />
                            {['Stage 0', 'Stage 1', 'Stage 2', 'Stage 3', 'Stage 4', 'Not Sure'].map(stage => (
                                <Picker.Item key={stage} label={stage} value={stage} />
                            ))}
                        </Picker>
                    </View>

                    {/* Type Picker */}
                    <Text style={[styles.label, { color: colors.textPrimary }]}>
                        What type of lung cancer do you have?
                    </Text>
                    <View style={[styles.pickerWrapper, { borderColor: colors.primary }]}>
                        <Picker
                            selectedValue={stage}
                            style={{ color: colors.textPrimary }}
                            onValueChange={setStage}
                        >

                            <Picker.Item label="Select Type" value="" />
                            <Picker.Item label="NSCLC (Non-Small Cell Lung Cancer)" value="NSCLC" />
                            <Picker.Item label="SCLC (Small Cell Lung Cancer)" value="SCLC" />
                            <Picker.Item label="Not Sure" value="Not Sure" />
                        </Picker>
                    </View>

                    {/* Genetic Mutation Info + Chips */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6, flexWrap: 'wrap' }}>
                        <Text style={[styles.label, { color: colors.textPrimary, flexShrink: 1, flexGrow: 0 }]}>
                            Do you know if you have any of these genetic mutations?
                        </Text>
                        <TouchableOpacity
                            onPress={() =>
                                Alert.alert(
                                    'Genetic Mutations Info',
                                    `Here’s some information on common genetic mutations in lung cancer:\n
• EGFR (Epidermal Growth Factor Receptor):  
  Often found in Non-Small Cell Lung Cancer (NSCLC).  
  It helps tumors grow, but targeted therapies can block it.\n
• ALK (Anaplastic Lymphoma Kinase):  
  Typically affects younger patients and non-smokers.  
  There are specific drugs that target this mutation effectively.\n
• ROS1:  
  A rare mutation but important because it can be treated with targeted therapies.\n
• KRAS:  
  One of the most common mutations in lung cancer.  
  It’s linked with resistance to some treatments, but new therapies are emerging.\n
• Don’t Know:  
  If you’re unsure about your mutation status, that’s okay!  
  Your doctor can help test for these mutations if needed.`
                                )
                            }

                            style={{ marginRight: 10 }} // add some right margin here
                        >
                            <Text style={{ fontSize: 18, color: colors.primary }}>ℹ️ - More Information</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.chipContainer}>
                        {mutationOptions.map(option => {
                            const selected = selectedMutations.includes(option);
                            return (
                                <TouchableOpacity
                                    key={option}
                                    onPress={() => toggleMutation(option)}
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

                    {/* Next Button */}
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
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        marginVertical: 8,
    },
    picker: {
        width: '100%',
        padding: 12,
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
        fontSize: 16,
    },
    dateButton: {
        padding: 12,
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 10,
    },
    chip: {
        borderWidth: 1,
        borderRadius: 20,
        paddingVertical: 6,
        paddingHorizontal: 12,
        marginRight: 8,
        marginBottom: 8,
    },
    button: {
        marginTop: 20,
        padding: 15,
        width: '80%',
        alignSelf: 'center',
        borderRadius: 10,
        alignItems: 'center',
    },
    pickerWrapper: {
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
        paddingHorizontal: 10,
    },

});

export default LungCancerDetailsScreen;
