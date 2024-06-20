export const validatePassword = (password: string) => {
    let passErrors = [];
    const lengthCheck = password.length > 8;
    const uppercaseCheck = /[A-Z]/.test(password);
    const symbolCheck = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!lengthCheck) passErrors.push("Password must be greater than 8 characters")
    if (!uppercaseCheck) passErrors.push("Password must contain one upper case letter")
    if (!symbolCheck) passErrors.push("Password must contain at least one symbol")

    return passErrors;
}