import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ThemeProvider } from '@mui/material/styles';
import { ReactQueryDevtools } from 'react-query/devtools';
import { css, Global } from '@emotion/react';
import { LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterMoment';
import { PullRequestsDashboard } from '@modules/pull-request-dashboard';
import { athenian, athenianMuiTheme } from '@core/themes/athenian';
import { Main } from '@core/layouts/main';

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
