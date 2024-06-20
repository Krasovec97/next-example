'use server'

import {cookies} from "next/headers";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import fetchApi from "@/app/lib/helpers";

if (process.env.ENVIRONMENT !== 'production') {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export default async function registerUser(_currentState: unknown, formData: FormData) {
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')

    const response = await fetchApi('/user/register', {
        method: 'POST',
        body: JSON.stringify({
            "name": name,
            "email": email,
            "password": password
        })
    });

    if (response.ok) {
        response.json().then((json) => cookies().set('auth', json.token));

        revalidatePath('/profile')
        redirect('/profile');
    } else {
        return response.json().then((json) => json.error_text);
    }
}