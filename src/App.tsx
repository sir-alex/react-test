import React from 'react';
import { Main } from '@modules/layouts/main';
import { PullRequestsDashboard } from '@modules/pull-request-dashboard';

const App: React.FC = () => {
    return (
        <Main>
            <PullRequestsDashboard />
        </Main>
    );
};

export default App;
