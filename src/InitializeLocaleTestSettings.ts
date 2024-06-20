export default function () {
    const useRouter = jest.spyOn(require('next/router'), 'useRouter')
    const locale = 'en';
    const messages = require(`../messages/${locale}.json`);

    useRouter.mockImplementationOnce(() => ({
        query: { locale: locale },
    }))

    return {
        locale,
        messages
    }
}