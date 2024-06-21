'use client'
import FormSubmitButton from "@/app/Components/FormSubmitButton";
import {useFormState, useFormStatus} from "react-dom";
import registerUser from "@/app/register/server";
import {useEffect, useState} from "react";
import {validatePassword} from "@/app/register/functions";

export default function Register() {
    const [errorMessage, dispatch] = useFormState(registerUser, undefined);
    const { pending } = useFormStatus()
    const [currentPassword, setCurrentPassword] = useState('');
    const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
    const [submitDisabled, setSubmitDisabled] = useState(true);


    useEffect(() => {
        let dynamicPasswordErrors = validatePassword(currentPassword);
        if (dynamicPasswordErrors.length > 0) {
            setPasswordErrors(dynamicPasswordErrors)
        } else {
            setPasswordErrors([]);
            setSubmitDisabled(false);
        }
    }, [currentPassword]);

    return (
        <div className="row">
            <h1>Register now</h1>
            <form action={dispatch}>
                <input className="form-control my-2" type="text" name="name" placeholder="John Snow"/>
                <input className="form-control my-2" type="email" name="email" placeholder="Email"/>
                <input onChange={(e) => setCurrentPassword(e.target.value)} className="form-control my-2"
                       type="password" name="password" placeholder="Password" aria-autocomplete={"none"}
                       autoComplete={"new-password"}/>
                {errorMessage &&
                    <div className='alert alert-danger'>
                        <p>{errorMessage}</p>
                    </div>
                }
                {(currentPassword !== '' && passwordErrors.length > 0) &&
                    <ul className="alert alert-danger">
                        {passwordErrors.map((error, index) => <li key={index}>{error}</li>)}
                    </ul>
                }

                <FormSubmitButton shouldBeDisabled={submitDisabled}/>
            </form>
        </div>
    )

}