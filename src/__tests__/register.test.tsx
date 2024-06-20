import {render} from "@testing-library/react";
import Register from "@/app/register/page";
import {validatePassword} from "@/app/register/functions";
import {authenticate} from "@/app/lib/actions";
jest.mock("react-dom", () => ({
    ...jest.requireActual("react-dom"),
    useFormState: () => [[authenticate, undefined], undefined],
    useFormStatus: () => ({ pending: false }),
}));

describe('Register page functionalities', () => {
    it('renders register page', () => {
        const component = render(<Register />)
        expect(component).toBeDefined();
    });

    it('fails all password checks when using string "test1"', () => {
        const password = 'test1';
        const passwordErrorMessages = [
            "Password must be greater than 8 characters",
            "Password must contain one upper case letter",
            "Password must contain at least one symbol",
        ]

        const passwordErrors = validatePassword(password);
        expect(passwordErrors).toHaveLength(3);
        passwordErrors.forEach((error) => {
            expect(typeof error).toBe("string")
            expect(passwordErrorMessages.includes(error)).toBeTruthy()
        })
        expect(passwordErrors.length === passwordErrorMessages.length).toBeTruthy()

    });

    it('fails 2 password checks when using string "Test1"', () => {
        const password = 'Test1';
        const passwordErrorMessages = [
            "Password must be greater than 8 characters",
            "Password must contain at least one symbol",
        ]

        const passwordErrors = validatePassword(password);
        expect(passwordErrors).toHaveLength(2);
        passwordErrors.forEach((error) => {
            expect(typeof error).toBe("string")
            expect(passwordErrorMessages.includes(error)).toBeTruthy()
        })
        expect(passwordErrors.length === passwordErrorMessages.length).toBeTruthy()
    });

    it('fails 1 password checks when using string "Test1!"', () => {
        const password = 'Test1!';
        const passwordErrorMessages = [
            "Password must be greater than 8 characters",
        ]

        const passwordErrors = validatePassword(password);
        expect(passwordErrors).toHaveLength(1);
        passwordErrors.forEach((error) => {
            expect(typeof error).toBe("string")
            expect(passwordErrorMessages.includes(error)).toBeTruthy()
        })
        expect(passwordErrors.length === passwordErrorMessages.length).toBeTruthy()
    });

    it('password checks passes with no errors when using string "Testtest1!"', () => {
        const password = 'Testtest1!';

        const passwordErrors = validatePassword(password);
        expect(passwordErrors).toHaveLength(0);
    });
})