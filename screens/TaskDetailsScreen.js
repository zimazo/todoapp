import React, {useContext, useState} from "react";
import {Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import {LocalizationContext} from "../components/Translations";
import {format, fromUnixTime} from "date-fns";
import {enUS, sk} from "date-fns/esm/locale";
import storage from "@react-native-firebase/storage";
import {useTheme} from "../theme/ThemeProvider";


export function TaskDetailsScreen({ navigation, route }) {
    const {translations, initializeAppLanguage} = useContext(LocalizationContext);
    initializeAppLanguage();

    const { item, deleteItem, switchCompleted, update } = route.params;

    const [isCompleted, setIsCompleted] = useState(item.completed);

    const viewCompleted = () => {
        return(
            <View style={{flexDirection: "row", justifyContent: "space-around", marginHorizontal: 30, marginVertical: 18}}>
                <TouchableOpacity style={styles.buttonDetailBottom} onPress={() => {setIsCompleted(false); switchCompleted(item)}}>
                    <Icon name="times" size={50} color='white'/>
                    <Text style={styles.buttonText}>{translations['detailsButtonUncomplete']}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const viewNotCompleted = () => {
        return(
            <View style={{flexDirection: "row", justifyContent: "space-around", marginHorizontal: 30, marginVertical: 18}}>
                {/*<TouchableOpacity style={styles.buttonDetailBottom}>*/}
                {/*    <Icon name="edit" size={50} color='blue'/>*/}
                {/*    <Text style={styles.buttonText}>{translations['detailsButtonEdit']}</Text>*/}
                {/*</TouchableOpacity>*/}
                <TouchableOpacity style={styles.buttonDetailBottom} onPress={() => {setIsCompleted(true); switchCompleted(item)}}>
                    <Icon name="check" size={50} color='white'/>
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
                        <Icon name="trash" size={25} color='#db4412'/>
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

    const [url, setUrl] = useState(null);

    const {colors, isDark} = useTheme();
    // const getDownloadUrl = () => {
    //     storage()
    //         .ref("images")
    //         .child(item.image)
    //         .getDownloadURL()
    //         .then(url => {
    //             setUrl(url);
    //             console.log("url:",url)
    //         });
    // }
    //
    // storage()
    //     .ref("rn_image_picker_lib_temp_182c42d8-da8e-4aad-90a3-cbcc2ae32f73.jpg?alt=media&token=dfa5597d-30ce-4cc9-a401-0d34ff8088be")
    //     .getDownloadURL()
    //     .then(url => {
    //         setUrl(url);
    //         console.log("url:",url)
    //     });

    let imageRef = storage().ref('/' + item.image);
    imageRef
        .getDownloadURL()
        .then((url) => {
            //from url you can fetched the uploaded image easily
            setUrl(url);
            console.log("url:",url)
        })
        .catch((e) => console.log('getting downloadURL of image error => ', e));

    return(
        // <View style={styles.container}>
        <ScrollView style={[styles.container, {backgroundColor: colors.background}]}>
            <View style={styles.detail}>
                <Text style={[styles.detailsTextTitle, {color: colors.text}]}>{translations['detailsTitle']}</Text>
                <Text style={[styles.detailsText, {color: colors.text}]}>{item.text}</Text>
            </View>
            <View style={styles.detail}>
                <Text style={[styles.detailsTextTitle, {color: colors.text}]}>{translations['detailsStatus']}</Text>
                <Text style={isCompleted ? styles.detailsIsCompletedText : styles.detailsIsNotCompletedText}>{isCompleted ? translations['detailsStatusCompleted'] : translations['detailsStatusNotCompleted']}</Text>
            </View>
            {item.details ?
                <View style={styles.detail}>
                    <Text style={[styles.detailsTextTitle, {color: colors.text}]}>{translations['detailsDetails']}</Text>
                    <Text style={[styles.detailsText, {color: colors.text}]}>{item.details}</Text>
                </View> : null}
            {/*<View style={styles.detail}>*/}
            {/*    <Text style={styles.detailsTextTitle}>{translations['detailsDetails']}</Text>*/}
            {/*    <Text style={styles.detailsText}>{item.details}</Text>*/}
            {/*</View>*/}
            <View style={styles.detail}>
                <Text style={[styles.detailsTextTitle, {color: colors.text}]}>{translations['detailsDateAdded']}</Text>
                <Text style={[styles.detailsText, {color: colors.text}]}>{format(item.dateAdded.toDate(),getFormat(), {locale: getLocale()})}</Text>
            </View>
            <View style={styles.detail}>
                <Text style={[styles.detailsTextTitle, {color: colors.text}]}>{translations['detailsDateEnd']}</Text>
                <Text style={[styles.detailsText, {color: colors.text}]}>{format(item.dateEnd.toDate(),getFormat(), {locale: getLocale()})}</Text>
            </View>
            {item.image ?
                <View style={styles.detail}>
                    <Text style={[styles.detailsTextTitle, {color: colors.text}]}>{translations['detailsImage']}</Text>
                    <Image style={styles.image} source={{uri: url}}/>
                </View > : null}
            {/*<View style={styles.detail}>*/}
            {/*    <Text style={styles.detailsTextTitle}>{translations['detailsImage']}</Text>*/}
            {/*    <Image style={styles.image} resizeMode='cover' source={{uri: url}}/>*/}
            {/*</View >*/}
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
        backgroundColor: '#119ff7',
        borderRadius: 5,
        // borderWidth: 2,
        width: 150,
        elevation: 2,
    },
    buttonText: {
        color: 'white',
        fontWeight: "bold",
    },
    image: {
        marginTop:10,
        marginLeft: 14,
        // aspectRatio: 16/9,
        // maxWidth: 307.2,
        // maxHeight: 172.8,
        width: 300,
        height: 350,
        borderRadius: 5,
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
        fontWeight: "bold",
    },
    detailsIsNotCompletedText: {
        color: '#db4412',
        marginTop:10,
        marginLeft: 15,
        fontWeight: "bold",
    },

});
