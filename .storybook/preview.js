import {ThemeProvider} from '@mui/material';
import {LocalizationProvider} from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterMoment';
import {athenianMuiTheme} from '../src/core/themes/athenian';

export const parameters = {
    actions: {argTypesRegex: "^on[A-Z].*"},
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
}

export const withThemeProvider = (Story, context) => {
    return (
        <ThemeProvider theme={athenianMuiTheme}>
            <LocalizationProvider dateAdapter={DateAdapter}>
                <Story {...context} />
            </LocalizationProvider>
        </ThemeProvider>
    );
};

export const decorators = [withThemeProvider];
