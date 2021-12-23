import * as React from 'react';
import * as moment from 'moment';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/lab';
import { CONFIG } from '@root/config';

export type Props = {
    title?: string;
    value?: string | null;
    className?: string;
    onChange?: IDatePickerOnChange;
    inputFormat?: string;
};

export type IDatePickerOnChange = (date: moment.Moment | null) => void;

export const UiDatePicker: React.FC<Props> = React.memo(({title, value, onChange, ...otherProps}) => {
    return (
        <DatePicker
            {...otherProps}
            label={title}
            value={value}
            onChange={onChange as IDatePickerOnChange}
            renderInput={(params) => <TextField {...params} />}
        />
    );
});

UiDatePicker.defaultProps = {
    inputFormat: CONFIG.DEFAULT_DATEPICKER_FORMAT
}
