import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/onboarding/WelcomeScreen';
import RoleSelectionScreen from '../screens/onboarding/RoleSelectionScreen';
import BasicInfoScreen from '../screens/onboarding/BasicInfoScreen';
import HealthHistoryScreen from '../screens/onboarding/HealthHistoryScreen';
import LifestyleScreen from '../screens/onboarding/LifestyleScreen';
import SleepDietScreen from '../screens/onboarding/SleepDietScreen';
import { UserProvider } from '../context/UserContext';
import InfoCollectedScreen from '../screens/onboarding/InfoCollectedScreen';
import CancerTypeSelectionScreen from '../screens/onboarding/CancerTypeSelectionScreen'; // ← Import
import LungCancerDetailsScreen from '../screens/onboarding/LungCancer/LungCancerDetailsScreen';
import TreatmentPlanScreen from '../screens/onboarding/LungCancer/TreatmentPlanScreen';
import TreatmentDetailsScreen from '../screens/onboarding/LungCancer/TreatmentDetailsScreen';
import SupportiveDetailsScreen from '../screens/onboarding/LungCancer/SupportiveDetailsScreen';
import ConsentScreen from '../screens/onboarding/LungCancer/ConsentSummaryScreen';
import ReadyToTalkScreen from '../screens/onboarding/LungCancer/ReadyToTalkScreen';


export type RootStackParamList = {
    Welcome: undefined;
    RoleSelection: undefined;
    BasicInfo: undefined;
    HealthHistory: undefined;
    Lifestyle: undefined;
    SleepDiet: undefined;
    InfoCollected: undefined;
    CancerTypeSelection: undefined;
    LungCancerDetails: undefined;
    TreatmentPlan: undefined;
    TreatmentDetails: undefined;
    SupportiveDetails: undefined;
    ConsentSummary: undefined;
    ReadyToTalk: undefined;
    // ← Add this
};


const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
    return (
        <UserProvider>
            <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
                <Stack.Screen name="BasicInfo" component={BasicInfoScreen} />
                <Stack.Screen name="HealthHistory" component={HealthHistoryScreen} />
                <Stack.Screen name="Lifestyle" component={LifestyleScreen} />
                <Stack.Screen name="SleepDiet" component={SleepDietScreen} />
                <Stack.Screen name="InfoCollected" component={InfoCollectedScreen} />
                <Stack.Screen name="CancerTypeSelection" component={CancerTypeSelectionScreen} />
                <Stack.Screen name="LungCancerDetails" component={LungCancerDetailsScreen} />
                <Stack.Screen name="TreatmentPlan" component={TreatmentPlanScreen} />
                <Stack.Screen name="TreatmentDetails" component={TreatmentDetailsScreen} />
                <Stack.Screen name="SupportiveDetails" component={SupportiveDetailsScreen} />
                <Stack.Screen name="ConsentSummary" component={ConsentScreen} />
                <Stack.Screen name="ReadyToTalk" component={ReadyToTalkScreen} />

            </Stack.Navigator>
        </UserProvider>
    );
};

export default RootNavigator;
