export function getItem (key: string, isParse: boolean = false): any {
    const val = localStorage.getItem(key);
    return val ? (isParse ? JSON.parse(val) : val) : null;
}

export function remove (key: string): void {
    localStorage.removeItem(key);
}

export function setItem (key: string, value: any): void {
    value = typeof value === 'object' ? JSON.stringify(value) : value;
    localStorage.setItem(key, value);
}

export * as LocalStorage from './local-storage';
