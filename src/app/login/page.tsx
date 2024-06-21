'use client'

import { authenticate } from '@/app/lib/actions'
import { useFormState } from 'react-dom'
import FormSubmitButton from "@/app/Components/FormSubmitButton";

export default function Login() {
    const [errorMessage, dispatch] = useFormState<string|undefined, any>(authenticate, undefined)

    return (
        <>
            <form name="loginForm" action={dispatch}>
                <input className="form-control" type="email" name="email" placeholder="Email" required/>
                <input className="form-control" type="password" name="password" placeholder="Password" required/>
                {errorMessage &&
                    <div className='alert alert-danger'>
                        <p>{errorMessage}</p>
                    </div>
                }
                <FormSubmitButton />
            </form>
        </>
    )
}