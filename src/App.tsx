import React from 'react';
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import DateAdapter from '@mui/lab/AdapterMoment';
import { Main } from '@modules/layouts/main';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/lab';
import { PullRequestsDashboard } from '@modules/pull-request-dashboard';
import { athenian, athenianMuiTheme } from '@core/themes/athenian';
import { css, Global } from '@emotion/react';

const queryClient = new QueryClient();

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
                <QueryClientProvider client={queryClient}>
                    <Main>
                        <PullRequestsDashboard />
                    </Main>
                    {process.env.NODE_ENV !== 'production' &&
                        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
                    }
                </QueryClientProvider>
            </LocalizationProvider>
        </ThemeProvider>
    );
};

export default App;
