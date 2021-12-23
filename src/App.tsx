import React from 'react';
import DateAdapter from '@mui/lab/AdapterMoment';
import { Main } from '@modules/layouts/main';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/lab';
import { PullRequestsDashboard } from '@modules/pull-request-dashboard';
import { athenian, athenianMuiTheme } from '@core/themes/athenian';
import { css, Global } from '@emotion/react';

const App: React.FC = () => {
    return (
        <ThemeProvider theme={athenianMuiTheme}>
            <LocalizationProvider dateAdapter={DateAdapter}>
                <Global
                    styles={css`
                        body {
                          background: ${athenian.bg.body};
                          margin: 0;
                          padding: 0;
                        }
                  `}
                />
                <Main>
                    <PullRequestsDashboard />
                </Main>
            </LocalizationProvider>
        </ThemeProvider>
    );
};

export default App;
