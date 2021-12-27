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

export function getToday(
    format: string = CONFIG.DEFAULT_DATE_TO_BE_SENT_FORMAT
): string {
    return moment().format(format);
}

export function subtract(
    date: moment.Moment,
    amount: moment.DurationInputArg1,
    unit: moment.DurationInputArg2,
    format: string = CONFIG.DEFAULT_DATE_TO_BE_SENT_FORMAT
): string {
    return date.subtract(amount, unit).format(format);
}

export function getDiffDuration(
    dateStart: string,
    dateEnd: string,
): moment.Duration {
    const dateStartMoment = moment(dateStart);
    const dateEndMoment = moment(dateEnd);
    return moment.duration(dateEndMoment.diff(dateStartMoment));
}

export function getDiffInUnits(
    dateStart: string,
    dateEnd: string,
    unit: moment.DurationInputArg2
): number {
    const duration = getDiffDuration(dateStart, dateEnd);
    let diffUnits = null;
    switch(unit) {
        case 'weeks':
            diffUnits = duration.asWeeks();
            break;
        case 'months':
            diffUnits = duration.asMonths();
            break;
        case 'days':
        default:
            diffUnits = duration.asDays();
    }
    return +diffUnits.toFixed(2);
}

export function isDatesDiffLessThanLimit(
    dateStart: string,
    dateEnd: string,
    amount: moment.DurationInputArg1,
    unit: moment.DurationInputArg2,
): boolean {
    const diffInUnits = getDiffInUnits(dateStart, dateEnd, unit);
    return !!(amount && Math.round(diffInUnits) <= amount);
}

export * as TimeService from './time-service';
