// src/constants/theme.ts

export interface theme {
    colors: {
        primary: string;
        secondary: string;
        background: string;
        surface: string;
        textPrimary: string;
        textSecondary: string;
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
    },
    font: {
        regular: 'Poppins-Regular',
        bold: 'Poppins-Bold',
        light: 'Poppins-Light',
    },
};
