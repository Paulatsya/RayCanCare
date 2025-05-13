import React, { createContext, useContext, useState, ReactNode } from "react";

type Role = "patient" | "caregiver" | "survivor";

interface UserInfo {
    role?: Role;

    firstName?: string;
    lastName?: string;
    email?: string;
    age?: number;
    gender?: string;
    location?: string;
    language?: string;

    hasAllergies?: boolean;
    allergyDetails?: string;
    medicationDetails?: string;
    onMedication?: boolean;
    healthConditions?: string[];
    allergies?: string;



    smokingStatus?: string;
    alcoholConsumption?: string;
    activityLevel?: string;
    sleepHours?: number;
    dietaryRestrictions?: string;
    hasDietaryRestrictions?: string;
    dob?: string;




    // Add more fields as needed
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
