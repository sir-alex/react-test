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
        primary: 'black'
    },
    bg: {
        body: '#f5f5f5',
        box: 'white'
    }
}

export const athenianMuiTheme = createTheme({
    breakpoints: {
        values: athenian.breakpoints
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
        secondary: {
            main: "#ff6c37"
        }
    }
});
