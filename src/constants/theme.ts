// src/constants/theme.ts

export interface theme {
    colors: {
        primary: string;
        secondary: string;
        background: string;
        surface: string;
        textPrimary: string;
        textSecondary: string;
        accent: string;
        border: string;
        shadow: string;
        success: string;
        error: string;
        chipBackground: string;
        chipSelected: string;
        disabled: string;
        divider: string;
        warning: string; // ✅ Added warning
    };
    font: {
        regular: string;
        bold: string;
        light: string;
    };
}

export const lightTheme: theme = {
    colors: {
        primary: '#B49EFF',
        secondary: '#FFB7D5',
        background: '#CAC9FB',
        surface: '#FFFFFF',
        textPrimary: '#2D2D2D',
        textSecondary: '#7A7A7A',
        accent: '#FF8A65',
        border: '#DDDDDD',
        shadow: '#00000010',
        success: '#4CAF50',
        error: '#F44336',
        chipBackground: '#EAE9FC',
        chipSelected: '#B49EFF',
        disabled: '#D1D1D1',
        divider: '#CCCCCC',
        warning: '#FFA500', // ✅ Included here
    },
    font: {
        regular: 'Poppins-Regular',
        bold: 'Poppins-Bold',
        light: 'Poppins-Light',
    },
};

export const darkTheme: theme = {
    colors: {
        primary: '#B49EFF',
        secondary: '#FFB7D5',
        background: '#151529',
        surface: '#1F1F3D',
        textPrimary: '#FFFFFF',
        textSecondary: '#BBBBBB',
        accent: '#FF8A65',
        border: '#333345',
        shadow: '#00000050',
        success: '#81C784',
        error: '#E57373',
        chipBackground: '#2D2D5D',
        chipSelected: '#B49EFF',
        disabled: '#444466',
        divider: '#33334D',
        warning: '#FFA500', // ✅ Included here
    },
    font: {
        regular: 'Poppins-Regular',
        bold: 'Poppins-Bold',
        light: 'Poppins-Light',
    },
};
