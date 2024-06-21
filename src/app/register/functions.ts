/**
 * Validates a password based on the following criteria:
 * - The password must be greater than 8 characters
 * - The password must contain at least one uppercase letter
 * - The password must contain at least one symbol
 *
 * @param {string} password - The password to be validated
 * @returns {string[]} - An array of error messages indicating the validation errors, empty if the password is valid
 */
export const validatePassword = (password: string) => {
    let passErrors:string[] = [];
    const lengthCheck = password.length > 8;
    const uppercaseCheck = /[A-Z]/.test(password);
    const symbolCheck = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!lengthCheck) passErrors.push("Password must be greater than 8 characters")
    if (!uppercaseCheck) passErrors.push("Password must contain one upper case letter")
    if (!symbolCheck) passErrors.push("Password must contain at least one symbol")

    return passErrors;
}