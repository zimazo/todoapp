import AsyncStorage from '@react-native-community/async-storage'; // 1
import React, {createContext, useState} from 'react';
import LocalizedStrings from 'react-native-localization'; // 2
import * as RNLocalize from 'react-native-localize'; // 3
import en from '../localization/en.json';
import sk from '../localization/sk.json';
import {enUS} from "date-fns/esm/locale";
const DEFAULT_LANGUAGE = 'en';
const APP_LANGUAGE = 'appLanguage';
const languages = {en, sk};
const translations = new LocalizedStrings(languages); // 4

const languagesLong = ['English', 'Slovak'];

// export const getLongLanguage = (language) => {
//     const languagesLong = ['English', 'Slovak'];
//     const index = languages.findIndex(obj => obj.language === language)
//     console.log(languagesLong[index])
//     return languagesLong[index]
// }

export const LocalizationContext = createContext({ // 5
    translations,
    setAppLanguage: () => {}, // 6
    appLanguage: DEFAULT_LANGUAGE, // 7
    initializeAppLanguage: () => {}, // 8
});

export const getLocale = async () => {
    const currentLanguage = await AsyncStorage.getItem(APP_LANGUAGE);
    return currentLanguage === 'en' ? enUS : sk
};

export const getFormat = async () => {
    const currentLanguage = await AsyncStorage.getItem(APP_LANGUAGE);
    return currentLanguage === 'en' ? 'EEE MMM d HH:mm yyyy' : 'EEE d. M. HH:mm yyyy'
};

export const LocalizationProvider = ({children}) => { // 9
    const [appLanguage, setAppLanguage] = useState(DEFAULT_LANGUAGE);
    // 11
    const setLanguage = language => {
        translations.setLanguage(language);
        setAppLanguage(language);
        AsyncStorage.setItem(APP_LANGUAGE, language);
    };
    // 12
    const initializeAppLanguage = async () => {
        const currentLanguage = await AsyncStorage.getItem(APP_LANGUAGE);
        if (currentLanguage) {
            setLanguage(currentLanguage);
        } else {
            let localeCode = DEFAULT_LANGUAGE;
            const supportedLocaleCodes = translations.getAvailableLanguages();
            const phoneLocaleCodes = RNLocalize.getLocales().map(
                locale => locale.languageCode,
            );
            phoneLocaleCodes.some(code => {
                if (supportedLocaleCodes.includes(code)) {
                    localeCode = code;
                    return true;
                }
            });
            setLanguage(localeCode);
        }
    };
    return (
        <LocalizationContext.Provider
            value={{
                translations,
                setAppLanguage: setLanguage, // 10
                appLanguage,
                initializeAppLanguage,
            }}>
            {children}
        </LocalizationContext.Provider>
    );
};
