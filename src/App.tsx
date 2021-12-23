import React from 'react';
import DateAdapter from '@mui/lab/AdapterMoment';
import { Main } from '@modules/layouts/main';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/lab';
import { PullRequestsDashboard } from '@modules/pull-request-dashboard';
import { athenianTheme } from '@core/themes/primary';

const App: React.FC = () => {
    return (
        <ThemeProvider theme={athenianTheme}>
            <LocalizationProvider dateAdapter={DateAdapter}>
                <Main>
                    <PullRequestsDashboard />
                </Main>
            </LocalizationProvider>
        </ThemeProvider>
    );
};

export default App;
