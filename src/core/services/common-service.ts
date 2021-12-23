import { nanoid } from 'nanoid';

export function generateKey(): string {
    return nanoid();
}

export * as CommonService from './common-service';
