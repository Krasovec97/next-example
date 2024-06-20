import {getRequestConfig} from 'next-intl/server';
import {cookies, headers} from "next/headers";

export default getRequestConfig(async () => {
    // Provide a static locale, fetch a user setting,
    // read from `cookies()`, `headers()`, etc.

    let localesString = headers().get('Accept-Language');
    let locale = localesString?.split(',')[0].substring(0, 2);

    return {
        locale,
        messages: (await import(`../messages/${locale}.json`)).default
    };
});