import * as React from 'react';
import * as moment from 'moment';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/lab';
import { CONFIG } from '@root/config';

export type Props = {
    title?: string;
    value?: string | null;
    minDate?: any;
    maxDate?: any;
    helperText?: string;
    onChange?: IDatePickerOnChange;
    inputFormat?: string;
};

export type IDatePickerOnChange = (date: moment.Moment | null) => void;

export const UiDatePicker: React.FC<Props> = React.memo((
    {
        title,
        value,
        helperText,
        onChange,
        ...otherProps
    }) => {
    return (
        <DatePicker
            {...otherProps}
            label={title}
            value={value}
            onChange={onChange as IDatePickerOnChange}
            renderInput={(params) => <TextField helperText={helperText} {...params} />}
        />
    );
});

UiDatePicker.defaultProps = {
    inputFormat: CONFIG.DEFAULT_DATEPICKER_FORMAT
}
