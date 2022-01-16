import React, {useContext, useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import Switch from "react-native/Libraries/Components/Switch/Switch";
import {LocalizationContext} from "../components/Translations";
import {useTheme} from "../theme/ThemeProvider";

export function SettingsScreen({navigation}) {
    const {translations, initializeAppLanguage} = useContext(LocalizationContext);
    initializeAppLanguage(); // 1

    const {setScheme, colors, isDark} = useTheme();

    // const [isEnabled, setIsEnabled] = useState(false);
    const toggleScheme = () => {
        /*
        * setScheme will change the state of the context
        * thus will cause childrens inside the context provider to re-render
        * with the new color scheme
        */
        isDark ? setScheme('light') : setScheme('dark');
    }

    return(
        <View style={[styles.container, {backgroundColor: colors.background}]}>
            <TouchableOpacity style={styles.setting} onPress={() => navigation.navigate('SettingsLanguage')}>
                <View style={styles.settingItems}>
                    <View>
                        <View>
                            <Text style={[styles.settingTextTitle, {color: colors.text}]}>{translations['languageSetting']}</Text>
                        </View>
                        <View>
                            <Text style={[styles.settingText, {color: colors.text}]}>{translations['languageSettingDetail']}</Text>
                        </View>
                    </View>
                    <View style={{justifyContent: "center"}}>
                        <Icon name="chevron-right" size={20} color={colors.text} />
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.setting} onPress={() => toggleScheme()}>
                <View style={styles.settingItems}>
                    <View>
                        <View>
                            <Text style={[styles.settingTextTitle, {color: colors.text}]}>{translations['darkModeSetting']}</Text>
                        </View>
                        <View>
                            <Text style={[styles.settingText, {color: colors.text}]}>{translations['darkModeSettingDetail']}</Text>
                        </View>
                    </View>
                    <View style={{justifyContent: "center"}}>
                        <Switch
                            // trackColor={{ false: "#767577", true: "#81b0ff" }}
                            // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                            // ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleScheme}
                            value={isDark}
                        />
                    </View>
                </View>
            </TouchableOpacity>
            {/*<Button title='wdwa' onPress={() => navigation.navigate('SettingsLanguage')}/>*/}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    setting: {
        margin: 30
    },
    settingItems: {
        justifyContent: 'space-between',
        flexDirection: "row",
    },
    settingTextTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: 'black'
    },
    settingText: {
        fontSize: 12,
    },
});
