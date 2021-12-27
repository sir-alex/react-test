/** @jsxImportSource @emotion/react */
import React from 'react';
import { Container } from '@mui/material';
import { mainStyle } from '@modules/layouts/styles';

export const Main: React.FC = (props) => {
    return (
        <Container
            maxWidth="xl"
            css={mainStyle}
        >
            {props.children}
        </Container>
    )
}
