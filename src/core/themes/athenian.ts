import { createTheme } from '@mui/material/styles';

export const athenian = {
    breakpoints: {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
    },
    padding: {
        primary: 30
    },
    fontColors: {
        primary: '#121242'
    },
    bg: {
        body: '#f5f5f5',
        box: '#fff',
        secondary: '#ff6c37'
    },
    borderRadius: 10,
}

export const athenianMuiTheme = createTheme({
    breakpoints: {
        values: athenian.breakpoints
    },
    shape: {
        borderRadius: athenian.borderRadius,
    },
    components: {
        MuiInputBase: {
            styleOverrides: {
                root: {
                    background: athenian.bg.box
                }
            }
        },
    },
    palette: {
        primary: {
            main: athenian.bg.box
        },
        secondary: {
            main: athenian.bg.secondary,
            contrastText: '#fff'
        },
        divider: '#ccc'
    },
    spacing: athenian.padding.primary / 2
});
