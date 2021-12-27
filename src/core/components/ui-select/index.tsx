// @ts-nocheck
import React from 'react';
import { FormControl, InputLabel, NativeSelect, SelectProps } from '@mui/material';
import { CommonService } from '@root/core/services/common-service';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { SelectChangeEvent } from '@mui/material/Select/SelectInput';

export interface UiSelectOption {
    name: number | string;
    value: number | string;
}

export type Props = SelectProps & {
    name: string;
    label?: string;
    onChange: (event: SelectChangeEvent<unknown>) => void;
    defaultText?: number | string;
    options: UiSelectOption[];
    sx?: SxProps<Theme>;
};

export const UiSelect: React.FC<Props> = React.memo((
    {
        name,
        label,
        value,
        defaultText,
        options,
        onChange,
        sx,
        ...otherProps
    }): JSX.Element => {
    return (
        <FormControl variant="standard" sx={sx}>
            {label &&
                <InputLabel htmlFor={name}>
                   {label}
                </InputLabel>
            }
            <NativeSelect
                value={value}
                onChange={onChange}
                inputProps={{
                    name: name,
                    id: name
                }}
                {...otherProps}
            >
                {defaultText &&
                    <option value="">
                        {defaultText}
                    </option>
                }
                {options.map((option) =>
                    <option
                        key={CommonService.generateKey()}
                        value={option.value}
                    >
                        {option.name}
                    </option>
                )}
            </NativeSelect>
        </FormControl>
    );
});
