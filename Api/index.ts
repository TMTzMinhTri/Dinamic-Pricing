export interface IResponse<T> extends IResponseResult {
    data: T
}

interface IResponseResult {
    error: IResponseError,
    success?: boolean
}
interface IResponseError {
    code: string,
    message: string
}

export const Api = {
    url: "http://localhost:5000",
    Get<T>(path: string) {
        const url = `this.url${path}`
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: "GET",
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(result => {
                resolve(result.json())
            }).catch(e => reject(e))
        }) as Promise<IResponse<T>>
    },
    POST<T>(path: string, body: object) {
        const url = `${this.url}${path}`
        console.log(url)
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: "POST",
                credentials: 'include',
                body: JSON.stringify(body),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(result => {
                resolve(result.json())
            }).catch(e => reject(e))
        }) as Promise<IResponse<T>>
    }
}

