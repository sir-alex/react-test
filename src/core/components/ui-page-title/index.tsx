/** @jsxImportSource @emotion/react */
import React from 'react';
import { Typography, TypographyProps } from '@mui/material';
import { titleStyle } from '@core/components/ui-page-title/styles';

interface Props extends TypographyProps {
    title?: string;
}

export const UiPageTitle: React.FC<Props> = React.memo(({title, ...otherProps}): JSX.Element => {
    return (
        <Typography
            css={titleStyle}
            {...otherProps}
        >
            {title}
        </Typography>
    );
});

UiPageTitle.defaultProps = {
    variant: "h1",
    gutterBottom: true
}
