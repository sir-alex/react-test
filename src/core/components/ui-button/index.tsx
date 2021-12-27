import React from 'react';
import { Button, ButtonProps } from '@mui/material';

export type Props = ButtonProps & {
    onClick?: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
};

export const UiButton: React.FC<Props> = React.memo(({title, children, ...otherProps}) => {
    return (
        <Button
            {...otherProps}
        >
            {children}
        </Button>
    );
});

UiButton.defaultProps = {
    type: 'button',
    variant: 'contained',
    color: 'secondary',
}
