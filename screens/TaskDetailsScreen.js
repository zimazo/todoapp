import React, {useContext, useState} from "react";
import {Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import {LocalizationContext} from "../components/Translations";
import {format, fromUnixTime} from "date-fns";
import {enUS, sk} from "date-fns/esm/locale";


export function TaskDetailsScreen({ navigation, route }) {
    const {translations, initializeAppLanguage} = useContext(LocalizationContext);
    initializeAppLanguage();

    const { item, deleteItem, switchCompleted, update } = route.params;

    const [isCompleted, setIsCompleted] = useState(item.completed);

    const viewCompleted = () => {
        return(
            <View style={{flexDirection: "row", justifyContent: "space-around", marginHorizontal: 30, marginVertical: 18}}>
                <TouchableOpacity style={styles.buttonDetailBottom} onPress={() => {setIsCompleted(false); switchCompleted(item)}}>
                    <Icon name="times" size={50} color='#db4412'/>
                    <Text style={styles.buttonText}>{translations['detailsButtonUncomplete']}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const viewNotCompleted = () => {
        return(
            <View style={{flexDirection: "row", justifyContent: "space-around", marginHorizontal: 30, marginVertical: 18}}>
                <TouchableOpacity style={styles.buttonDetailBottom}>
                    <Icon name="edit" size={50} color='blue'/>
                    <Text style={styles.buttonText}>{translations['detailsButtonEdit']}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonDetailBottom} onPress={() => {setIsCompleted(true); switchCompleted(item)}}>
                    <Icon name="check" size={50} color='green'/>
                    <Text style={styles.buttonText}>{translations['detailsButtonComplete']}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const deleteAndGoBack = () => {
        Alert.alert(
            translations['detailsDeleteTitle'],
            translations['detailsDeleteMessage'],
            [
                {
                    text: translations['detailsDeleteText1'],
                    onPress: () => {deleteItem(item.id); navigation.goBack()},
                },
                {
                    text: translations['detailsDeleteText2'],
                },
            ],
            {
                cancelable: true,
            }
        )
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: translations['detailsScreen'] + ' (' + item.text + ')',
            headerRight: () => (
                <TouchableOpacity onPress={() => deleteAndGoBack()}>
                    <View style={{justifyContent: 'space-between', alignItems: 'center', padding: 7, marginRight:-10}}>
                        <Icon name="trash" size={25} color='red'/>
                    </View>
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    const getLocale = () => {
        return translations.getLanguage() === 'en' ? enUS : sk
    };

    const getFormat = () => {
        return translations.getLanguage() === 'en' ? 'EEE MMM d HH:mm yyyy' : 'EEE d. M. HH:mm yyyy'
    };

    return(
        // <View style={styles.container}>
        <ScrollView style={styles.container}>
            <View style={styles.detail}>
                <Text style={styles.detailsTextTitle}>{translations['detailsTitle']}</Text>
                <Text style={styles.detailsText}>{item.text}</Text>
            </View>
            <View style={styles.detail}>
                <Text style={styles.detailsTextTitle}>{translations['detailsStatus']}</Text>
                <Text style={isCompleted ? styles.detailsIsCompletedText : styles.detailsIsNotCompletedText}>{isCompleted ? translations['detailsStatusCompleted'] : translations['detailsStatusNotCompleted']}</Text>
            </View>
            <View style={styles.detail}>
                <Text style={styles.detailsTextTitle}>{translations['detailsDetails']}</Text>
                <Text style={styles.detailsText}>{item.details}</Text>
            </View>
            <View style={styles.detail}>
                <Text style={styles.detailsTextTitle}>{translations['detailsDateAdded']}</Text>
                <Text style={styles.detailsText}>{format(item.dateAdded.toDate(),getFormat(), {locale: getLocale()})}</Text>
            </View>
            <View style={styles.detail}>
                <Text style={styles.detailsTextTitle}>{translations['detailsDateEnd']}</Text>
                <Text style={styles.detailsText}>{format(item.dateEnd.toDate(),getFormat(), {locale: getLocale()})}</Text>
            </View>
            <View style={styles.detail}>
                <Text style={styles.detailsTextTitle}>{translations['detailsImage']}</Text>
                <Image style={styles.image} resizeMode='cover' source={require('../assets/img_1.png')}/>
            </View >
            {isCompleted ? viewCompleted() : viewNotCompleted()}
        </ScrollView>
        // {/*</View>*/}

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    buttonDetailBottom: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'white',
        borderRadius: 8,
        borderWidth: 2,
        width: 150,
    },
    buttonText: {
        color: 'black',
    },
    image: {
        marginTop:10,
        marginLeft: 14,
        // aspectRatio: 16/9,
        // maxWidth: 307.2,
        // maxHeight: 172.8,
        width: 307.2,
        height: 172.8,
        // backgroundColor: 'green',
        // marginBottom: -100,

    },
    detail: {
        marginHorizontal: 30,
        marginVertical: 14,
        paddingBottom: 0,
    },
    detailsTextTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color:'black'
    },
    detailsText: {
        color: 'black',
        marginTop:10,
        marginLeft: 15,
    },
    detailsIsCompletedText: {
        color: 'green',
        marginTop:10,
        marginLeft: 15,
    },
    detailsIsNotCompletedText: {
        color: '#db4412',
        marginTop:10,
        marginLeft: 15,
    },

});
