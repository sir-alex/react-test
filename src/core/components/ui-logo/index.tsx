/** @jsxImportSource @emotion/react */
import React from 'react';
import logo from '@assets/img/logo_athenian.svg';
import { PrDashboardTestIds } from '@type/test-ids';
import { logoStyle } from '@core/components/ui-logo/styles';

export const UiLogo: React.FC = React.memo(() => {
    return (
        <a
            href="https://athenian.co"
            target="_blank"
            rel="noopener noreferrer"
            data-testid={PrDashboardTestIds.logo}
        >
            <img
                src={logo}
                alt="Athenian"
                css={logoStyle}
            />
        </a>
    );
});
