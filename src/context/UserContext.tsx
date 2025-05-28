import React, { createContext, useContext, useState, ReactNode } from "react";

type Role = "patient" | "caregiver" | "survivor";

interface LungCancerDetails {
    diagnosisDate: Date;
    stage: string;
    lungCancerType: string;
    mutations: string[];
}

// Optional: Strongly typed details for specific treatments
interface ChemotherapyDetails {
    startDate?: string;
    frequency?: string;
    nextSession?: string;
    sideEffects?: string[];
}

interface RadiationDetails {
    bodyArea?: string;
    numberOfSessions?: number;
    sideEffects?: string[];
}

interface SurgeryDetails {
    surgeryType?: string;
    date?: string;
    recoveryNotes?: string;
}

interface ImmunoTargetedDetails {
    drugName?: string;
    symptoms?: string[];
    schedule?: string;
}

interface TreatmentDetails {
    treatments?: string[]; // List of selected treatment names
    started?: boolean;
    details?: {
        Chemotherapy?: ChemotherapyDetails;
        RadiationTherapy?: RadiationDetails;
        Surgery?: SurgeryDetails;
        Immunotherapy?: ImmunoTargetedDetails;
        TargetedTherapy?: ImmunoTargetedDetails;
        ClinicalTrial?: any;
        PalliativeCare?: any;
        "Don’t Know Yet"?: any;
    };
}

interface SupportiveDetails {
    respiratorySymptoms?: string[];
    breathingAid?: boolean;
    breathingExercise?: boolean;
    oxygenSupport?: boolean;
}

interface UserInfo {
    role?: Role;

    firstName?: string;
    lastName?: string;
    email?: string;
    age?: number;
    gender?: string;
    location?: string;
    language?: string;

    healthConditions?: string[];
    onMedication?: boolean | null;
    medicationDetails?: string;
    hasAllergies?: boolean | null;
    allergyDetails?: string;

    smokingStatus?: string;
    alcoholConsumption?: string;
    activityLevel?: string;
    sleepHours?: number;
    dietaryRestrictions?: string;
    hasDietaryRestrictions?: string;
    dob?: string;

    cancerType?: string;

    lungCancerDetails?: LungCancerDetails;

    treatmentPlan?: TreatmentDetails;

    supportiveDetails?: SupportiveDetails;
}

interface UserContextType {
    userInfo: UserInfo;
    setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [userInfo, setUserInfo] = useState<UserInfo>({});

    return (
        <UserContext.Provider value={{ userInfo, setUserInfo }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
