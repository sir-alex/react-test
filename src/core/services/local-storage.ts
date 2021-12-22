const localStorage = require('localStorage');

const getItem = (key: string): any => {
    return localStorage.getItem(key);
}

const remove = (key: string): void => {
    localStorage.removeItem(key);
}

const setItem = (key: string, value: any): void => {
    value = typeof value === 'object' ? JSON.stringify(value) : value;
    localStorage.setItem(key, value);
}

export * as LocalStorage from './local-storage';
