import { createTheme } from '@mui/material/styles';

export const primary = {
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
    }
}

export const athenianTheme = createTheme({
    breakpoints: {
        values: primary.breakpoints
    },
    palette: {
        secondary: {
            main: "#ff6c37"
        }
    }
});
