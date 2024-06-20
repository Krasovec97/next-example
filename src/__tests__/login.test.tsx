import '@testing-library/jest-dom'
import {render} from '@testing-library/react'
import React from "react";
import Login from "@/app/login/page";
import {authenticate} from "@/app/lib/actions";
import FormSubmitButton from "@/app/Components/FormSubmitButton";
jest.mock("react-dom", () => ({
    ...jest.requireActual("react-dom"),
    useFormState: () => [[authenticate, undefined], undefined],
    useFormStatus: () => ({ pending: false }),
}));

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({
            id: 1,
            name: "Janez Novak",
            email: "janeznovak@gmail.com"
        }),
    }),
) as jest.Mock;

describe('Login page actions', () => {
    it('Renders login page', () => {
        const component = render(<Login />)
        expect(component).toBeDefined();
    });

    it('Renders Login button', () => {
        const renderButton = render(<FormSubmitButton />);
        expect(renderButton).toBeDefined();
    });

    it('Returns login data from login', async () => {
        let formData = new FormData();
        formData.append("email", "janeznovak@gmail.com");
        formData.append("password", "secret1234")

        const user = authenticate('', formData);
        user.then((res) => console.log(res));
        expect(user).toBeDefined();
        expect(user).toEqual({
            id: 1,
            name: "Janez Novak",
            email: "janeznovak@gmail.com"
        })
        expect(user).toHaveBeenCalled();

    });
})