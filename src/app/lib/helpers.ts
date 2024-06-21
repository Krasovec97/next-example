'use server'
import {cookies} from "next/headers";

const globalHeaders = {
    'X-Api-Authentication': process.env.API_AUTH,
    'Client-Version': process.env.CLIENT_VERSION,
}

function mergeHeaders (...headerInits: any[]) {
    let result = {}
    headerInits.forEach((init) => {
        new Headers(init).forEach((value:any , key: any) => {
            if (value === 'null' || value === 'undefined') {
                // @ts-ignore
                delete result[key]
            } else {
                // @ts-ignore
                result[key] = value
            }
        })
    })
    return result
}

export default async function fetchApi(input: string, options: any) {
    // your headers
    const defaultHeaders = {
        ...globalHeaders
    }
    // merge them with the headers of the options
    let headers = mergeHeaders(defaultHeaders, options.headers)

    if (cookies().has('auth')) {
        headers = mergeHeaders({
            Authorization: `Bearer ${cookies().get('auth')?.value}`
        }, headers);
    }

    // add the headers to the options
    return fetch(process.env.API_BASE_URL+input, { ...options, headers })
}