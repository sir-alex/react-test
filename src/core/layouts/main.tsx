/** @jsxImportSource @emotion/react */
import React from 'react';
import { Container } from '@mui/material';
import { mainStyle } from '@core/layouts/styles';

export const Main: React.FC = ({children}) => {
    return (
        <Container
            maxWidth="xl"
            css={mainStyle}
        >
            {children}
        </Container>
    )
}
