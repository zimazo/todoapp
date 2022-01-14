import React, {useContext, useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import Switch from "react-native/Libraries/Components/Switch/Switch";
import {LocalizationContext} from "../components/Translations";

export function SettingsScreen({navigation}) {
    const {translations, initializeAppLanguage} = useContext(LocalizationContext);
    initializeAppLanguage(); // 1

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.setting} onPress={() => navigation.navigate('SettingsLanguage')}>
                <View style={styles.settingItems}>
                    <View>
                        <View>
                            <Text style={styles.settingTextTitle}>{translations['languageSetting']}</Text>
                        </View>
                        <View>
                            <Text style={styles.settingText}>{translations['languageSettingDetail']}</Text>
                        </View>
                    </View>
                    <View style={{justifyContent: "center"}}>
                        <Icon name="chevron-right" size={20} />
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.setting} onPress={() => toggleSwitch()}>
                <View style={styles.settingItems}>
                    <View>
                        <View>
                            <Text style={styles.settingTextTitle}>{translations['darkModeSetting']}</Text>
                        </View>
                        <View>
                            <Text style={styles.settingText}>{translations['darkModeSettingDetail']}</Text>
                        </View>
                    </View>
                    <View style={{justifyContent: "center"}}>
                        <Switch
                            // trackColor={{ false: "#767577", true: "#81b0ff" }}
                            // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                            // ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
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
