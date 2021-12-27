import React from 'react';
import { CircularProgress, CircularProgressProps } from '@mui/material';

type Props = CircularProgressProps;

export const UiLoading: React.FC<Props> = React.memo(({ ...props}) => {
    return (
        <CircularProgress {...props} />
    );
});

UiLoading.defaultProps = {
    color: 'secondary'
}
