/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { Container } from '@mui/material';
import { mainStyle } from '@modules/layouts/styles';

export const Main: React.FC = (props) => {
    return (
        <Container
            maxWidth="md"
            css={mainStyle}
        >
            {props.children}
        </Container>
    )
}