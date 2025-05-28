import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
} from 'react-native';
import { useColorScheme, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { lightTheme, darkTheme } from '../../constants/theme';
import { useUser } from '../../context/UserContext';  // <-- Import your UserContext hook

// Inside your component


const cancerTypes = [
    { label: 'Lung Cancer', value: 'lung' },
    { label: 'Breast Cancer', value: 'breast' },
    { label: 'Leukemia', value: 'leukemia' },
    { label: 'Colorectal Cancer', value: 'colorectal' },
    { label: 'Other', value: 'other' },
];

interface Props {
    navigation: any;
}

const CancerTypeSelectionScreen: React.FC<Props> = ({ navigation }) => {
    const { userInfo, setUserInfo } = useUser();  // Use your context here
    const colorScheme = useColorScheme();
    const { colors, font } = colorScheme === 'dark' ? darkTheme : lightTheme;

    const [selectedType, setSelectedType] = useState('');
    const [otherText, setOtherText] = useState('');

    const handleContinue = () => {
        if (!selectedType) return;

        let cancerTypeToSave = selectedType;
        if (selectedType === 'other' && otherText.trim() !== '') {
            cancerTypeToSave = otherText.trim();
        }

        // Save cancer type in user context

        setUserInfo(prev => ({
            ...prev,
            cancerType: cancerTypeToSave,
        }));
        // console.log('User Info:', userInfo);
        // Navigate and pass cancerType param


        navigation.navigate('LungCancerDetails', { cancerType: cancerTypeToSave });
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 30,
                    marginTop: 40,
                }}
            >
                <Animatable.Text
                    animation="fadeInDown"
                    style={{
                        fontSize: 24,
                        color: colors.surface,
                        fontFamily: font.bold,
                        marginTop: 5,
                        textAlign: 'center',
                    }}
                >
                    Let's Get Specific!
                </Animatable.Text>
                <Image
                    source={require('../../assets/RaySmileNoBG.png')}
                    style={{
                        width: 50,
                        height: 50,
                        marginLeft: 10,
                        borderRadius: 16,
                    }}
                />
            </View>

            <Animatable.Text
                animation="fadeInUp"
                delay={300}
                style={[styles.subtitle, { marginBottom: 40, marginTop: 10, color: colors.textPrimary, fontFamily: font.regular }]}
            >
                Which type of cancer are you managing?
            </Animatable.Text>


            <ScrollView
                style={styles.scroll}
                contentContainerStyle={[styles.optionsContainer]}
                keyboardShouldPersistTaps="handled"
            >
                {cancerTypes.map((item, index) => (
                    <Animatable.View
                        key={item.value}
                        animation="fadeInUp"
                        delay={400 + index * 100}
                    >
                        <TouchableOpacity
                            style={[
                                styles.option,
                                {
                                    backgroundColor: selectedType === item.value ? colors.primary : colors.surface,
                                    borderColor: selectedType === item.value ? colors.primary : colors.border,
                                },
                            ]}
                            onPress={() => setSelectedType(item.value)}
                            activeOpacity={0.8}
                        >
                            <Text
                                style={{
                                    color: selectedType === item.value ? colors.surface : colors.primary,
                                    fontFamily: font.regular,
                                    fontWeight: selectedType === item.value ? '600' : '400',
                                    fontSize: 16,
                                }}
                            >
                                {item.label}
                            </Text>
                        </TouchableOpacity>
                    </Animatable.View>
                ))}

                {/* Show text input only if 'Other' is selected */}
                {selectedType === 'other' && (
                    <TextInput
                        style={[
                            styles.input,
                            { borderColor: colors.primary, color: colors.textPrimary, fontFamily: font.regular },
                        ]}
                        placeholder="Please specify"
                        placeholderTextColor={colors.border}
                        value={otherText}
                        onChangeText={setOtherText}
                    />
                )}
            </ScrollView>

            <TouchableOpacity
                style={[
                    styles.button,
                    {
                        backgroundColor:
                            selectedType === 'other'
                                ? otherText.trim().length > 0
                                    ? colors.primary
                                    : colors.disabled
                                : selectedType
                                    ? colors.primary
                                    : colors.disabled,
                    },
                ]}
                disabled={selectedType === '' || (selectedType === 'other' && otherText.trim().length === 0)}
                onPress={handleContinue}
                activeOpacity={0.8}
            >
                <Text style={{ color: colors.surface, fontFamily: font.regular, fontSize: 16 }}>
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
        paddingTop: 50,
    },
    title: {
        fontSize: 28,
        marginBottom: 12,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 24,
        textAlign: 'center',
    },
    scroll: {
        flex: 1,
    },
    optionsContainer: {
        alignItems: 'center',
        paddingBottom: 40,
    },
    option: {
        width: '90%',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 12,
        borderWidth: 1.5,
        marginBottom: 16,
    },
    input: {
        width: '90%',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 12,
        borderWidth: 1.5,
        marginTop: 10,
        marginBottom: 30,
        fontSize: 16,
    },
    button: {
        alignSelf: 'center',
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 12,
        marginBottom: 120,
    },
});

export default CancerTypeSelectionScreen;
