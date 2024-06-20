'use server'

import {cookies} from "next/headers";
import {redirect, RedirectType} from "next/navigation";
import fetchApi from "@/app/lib/helpers";

if (process.env.ENVIRONMENT !== 'production') {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export async function getUserData() {
    const response = await fetchApi('/user', {});

    if (response.ok) {
        return response.json()
    } else {
        console.log(response);
    }
}

export async function logOut() {
    const response = await fetchApi('/user/logout', {
        method: 'POST'
    });

    if (response.ok) {
        cookies().delete('auth');
        redirect('/');
    } else {
        console.log(response);
    }
}