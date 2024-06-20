import InitializeLocaleTestSettings from "@/InitializeLocaleTestSettings";
import {string} from "prop-types";


describe('Test initialization check', () => {
    it('Returns values of locale and messages', () => {
        let init = InitializeLocaleTestSettings();
        expect(init.locale).toBeDefined();
        expect(typeof init.locale).toBe("string");
        expect(init.messages).toBeDefined();
    });
})