import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/onboarding/WelcomeScreen';
import RoleSelectionScreen from '../screens/onboarding/RoleSelectionScreen';
import BasicInfoScreen from '../screens/onboarding/BasicInfoScreen';
import HealthHistoryScreen from '../screens/onboarding/HealthHistoryScreen';
import LifestyleScreen from '../screens/onboarding/LifestyleScreen';
import SleepDietScreen from '../screens/onboarding/SleepDietScreen';
import { UserProvider } from '../context/UserContext';
import InfoCollectedScreen from '../screens/onboarding/InfoCollectedScreen'; // ← Import


export type RootStackParamList = {
    Welcome: undefined;
    RoleSelection: undefined;
    BasicInfo: undefined;
    HealthHistory: undefined;
    Lifestyle: undefined;
    SleepDiet: undefined;
    InfoCollected: undefined; // ← Add this
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
            </Stack.Navigator>
        </UserProvider>
    );
};

export default RootNavigator;
