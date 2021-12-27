import React from 'react';
import { Typography, TypographyProps } from '@mui/material';

interface Props extends TypographyProps {
    status?: number;
    text?: string;
}

export const UiError: React.FC<Props> = React.memo((
    {
        status,
        text,
        ...otherProps
    }) => {
    return (
        <Typography
            align={'center'}
            {...otherProps}
        >
            {text || 'Something goes wrong'}. {status ? 'Error: ' + status : ''}
        </Typography>
    );
});
