import moment from 'moment';
import { CONFIG } from '@root/config';

export function printDate(
    date: string,
    format: string = CONFIG.DEFAULT_PRINT_DATE_FORMAT
): string {
    return moment(date).format(format);
}

export function toBeSentToServer(
    date: moment.Moment,
    format: string = CONFIG.DEFAULT_DATE_TO_BE_SENT_FORMAT
): string {
    return date.format(format);
}

export * as TimeService from './time-service';
