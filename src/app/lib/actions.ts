'use server'

import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {throws} from "node:assert";
import {revalidatePath} from "next/cache";

if (process.env.ENVIRONMENT !== 'production') {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export async function authenticate(_currentState: unknown, formData: FormData) {
    const email = formData.get('email')
    const password = formData.get('password')

    const response = await fetch(process.env.API_BASE_URL + '/user/login', {
        method: 'POST',
        headers: {
            'X-Api-Authentication': process.env.API_AUTH ?? '',
            'Client-Version': process.env.CLIENT_VERSION ?? '',
            'Authorization': `Basic ${btoa(`${email}:${password}`)}`,
        }
    });


    if (response.ok) {
        response.json().then((json) => cookies().set('auth', json.token));

        revalidatePath('/profile')
        redirect('/profile');
    } else {
        return response.json().then((json) => json.error_text);
    }
}