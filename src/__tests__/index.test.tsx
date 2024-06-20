import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import React from "react";
import Home from "../app/page";
import {NextIntlClientProvider} from "next-intl";
import {beforeAll} from "@jest/globals";
import InitializeLocaleTestSettings from "@/InitializeLocaleTestSettings";


describe('Home page actions', () => {
    let init: { locale: string; messages?: any; };
    beforeAll(() => {
        init = InitializeLocaleTestSettings();
    })

    it('Renders homepage', async () => {
        const homePage = render(
            <NextIntlClientProvider messages={init.messages} locale={init.locale}>
                <Home />
            </NextIntlClientProvider>
        );
        expect(homePage).toMatchSnapshot();
        expect(homePage.getByRole('heading', { level: 1, name: 'Hello' })).toBeDefined();
        expect(homePage.getByRole('link', {name: 'Login'})).toBeDefined();
        expect(homePage.getByRole('link', {name: 'Register'})).toBeDefined();
    });
})