'use client'
import {useEffect, useState} from "react";
import fetchApi from "@/app/lib/helpers";
import {getUserData, logOut} from "@/app/profile/server";
import {useRouter} from "next/navigation";

interface User {
    id: number,
    name: string,
    email: string
}

export default function Profile() {
    const [user, setUser] = useState<User|null>(null);

    useEffect(() => {
        syncUserData();
    }, [])

    function syncUserData() {
        getUserData()
            .then(r => setUser(r));
    }

    function logUserOut() {
        logOut();
    }


    return (
        <>
            <h1>Hello, {user?.name}</h1>
            <p>Your id is: {user?.id}</p>
            <p>Your email is: {user?.email}</p>
            <button onClick={syncUserData} className="btn btn-primary">Fetch data again</button>
            <button onClick={logUserOut} className="btn btn-primary">Log Out</button>
        </>
    );
}