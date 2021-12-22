import * as fs from 'fs';

export class RequestService {

    public post<T extends unknown>(
        to: string,
        params: object,
        name: string
    ): Promise<T> {
        const fullPath = this.buildApiPath(to, name);
        return new Promise((resolve, reject): void => {
            fs.readFile(fullPath, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(JSON.parse(data));
                }
            });
        });
    }

    private buildApiPath(to: string, name: string) : string {
        const folder = to.replace(/\//g, '-');
        return `./src/core/services/__mockData__/${folder}/${name}.json`;
    }

}
