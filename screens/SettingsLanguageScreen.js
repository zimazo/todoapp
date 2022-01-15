import React, {useContext} from "react";
import {LocalizationContext} from "../components/Translations";
import {View} from "react-native";
import {Divider, ListItem} from "react-native-elements";
import Icon from "react-native-vector-icons/dist/FontAwesome";

export function SettingsLanguageScreen() {
    const {
        translations,
        appLanguage,
        setAppLanguage,
        initializeAppLanguage,
    } = useContext(LocalizationContext); // 1
    initializeAppLanguage(); // 2

    return(
        <View>
            {translations.getAvailableLanguages().map((currentLang, i) => (
                <ListItem key={i} bottomDivider onPress={() => {setAppLanguage(currentLang);}}>
                    <ListItem.Content>
                        <ListItem.Title>{currentLang === 'en' ? translations['languageEnglish'] : translations['languageSlovak']}</ListItem.Title>
                        {/*<ListItem.CheckBox>{appLanguage === currentLang}</ListItem.CheckBox>*/}
                        {/*<View style={{justifyContent: "space-around", alignItems: "center", flexDirection: "row"}}>*/}
                        {/*    <ListItem.Title>{currentLang}</ListItem.Title>*/}
                        {/*</View>*/}
                        <Divider/>
                    </ListItem.Content>
                    {appLanguage === currentLang ? <Icon name="check" size={21} color={"#119ff7"}/> : null}
                </ListItem>
            ))}
        </View>
    )
}
