import React, {useContext, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity, Button, Image, Platform, Alert, SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import DatePicker from "react-native-date-picker";
import {LocalizationContext} from "./Translations";
import {format} from 'date-fns'
import {sk, enUS} from "date-fns/esm/locale";
import firestore from "@react-native-firebase/firestore";
import {useTheme} from "../theme/ThemeProvider";
import UploadScreen from "./AddImage";

import * as ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';

const AddTask = ({navigation}) => {
    const {translations, initializeAppLanguage} = useContext(LocalizationContext);
    initializeAppLanguage();

    const {colors, isDark} = useTheme();

    const [text, setText] = useState('');
    const dateAdded = new Date()
    const [dateEnd, setDateEnd] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [details, setDetails] = useState('');

    const onChangeText = textValue => setText(textValue);
    const onChangeDetails = detailsValue => setDetails(detailsValue);
    function checkDate ({ date }) {
        return date !== '';
    }

    const getLocale = () => {
        return translations.getLanguage() === 'en' ? enUS : sk
    };

    const getFormat = () => {
       return translations.getLanguage() === 'en' ? 'EEE MMM d HH:mm yyyy' : 'EEE d. M. HH:mm yyyy'
    };

    // const [photo, setPhoto] = useState(null);
    // const choosePhoto = () => {
    //     const options = {
    //         saveToPhotos: true,
    //     }
    //     ImagePicker.launchCamera(options, (response) => {
    //         console.log("response:", response);
    //
    //     }).then(r =>{
    //         setPhoto(r.assets[0].uri)
    //         console.log("uri", r.assets[0].uri)
    //     })
    //
    // };

    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);

    const clearImage = () => {
        setImage(null)
    }

    const selectImage = () => {
        const options = {
            maxWidth: 2000,
            maxHeight: 2000,
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.launchImageLibrary(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else {

            }
        }).then(r =>{
            const source = r.assets[0];
            console.log(source);
            setImage(source);
        });
    };

    const takePhoto = () => {
        const options = {
            maxWidth: 2000,
            maxHeight: 2000,
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.launchCamera(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else {

            }
        }).then(r =>{
            const source = r.assets[0];
            console.log(source);
            setImage(source);
        });
    };

    const uploadImage = async () => {
        const { uri } = image;
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        setUploading(true);
        setTransferred(0);
        const task = storage()
            .ref(filename)
            .putFile(uploadUri);
        // set progress state
        task.on('state_changed', snapshot => {
            setTransferred(
                Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
            );
        });
        try {
            await task;
        } catch (e) {
            console.error(e);
        }
        setUploading(false);
        // Alert.alert(
        //     'Photo uploaded!',
        //     'Your photo has been uploaded to Firebase Cloud Storage!'
        // );
        console.log("Your photo has been uploaded to Firebase Cloud Storage!")
        setImage(null);
    };

    // const [url, setUrl] = useState(null);
    //
    // const getDownloadUrl = () => {
    //     storage()
    //         .ref("images")
    //         .child(image.fileName)
    //         .getDownloadURL()
    //         .then(url => {
    //             setUrl(url);
    //             console.log("url:",url)
    //         });
    // }
    // return (
    //     <SafeAreaView style={styles.container}>
    //         <TouchableOpacity style={styles.selectButton} onPress={selectImage}>
    //             <Text style={styles.buttonText}>Pick an image</Text>
    //         </TouchableOpacity>
    //         <View style={styles.imageContainer}>
    //             {image !== null ? (
    //                 <Image source={{ uri: image.uri }} style={styles.imageBox} />
    //             ) : null}
    //             {uploading ? (
    //                 <View style={styles.progressBarContainer}>
    //                     <Progress.Bar progress={transferred} width={300} />
    //                 </View>
    //             ) : (
    //                 <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
    //                     <Text style={styles.buttonText}>Upload image</Text>
    //                 </TouchableOpacity>
    //             )}
    //         </View>
    //     </SafeAreaView>
    // );

    return (
        <View style={{flex:1, backgroundColor: colors.background}}>
            {/*{console.log(dateEnd)}*/}
            <Text style={[styles.title, {color: colors.text}]}>{translations['addTaskTextTitle']}</Text>
            <TextInput
                placeholder={translations['addTaskTextPlaceholder']}
                placeholderTextColor={colors.textInput}
                maxLength={28}
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
            />
            {/*<TextInput*/}
            {/*    placeholder="Add Date..."*/}
            {/*    style={styles.input}*/}
            {/*    onChangeText={onChangeDate}*/}
            {/*    value={date}*/}
            {/*/>*/}
            {/*<TouchableOpacity onPress={() => setOpen(true)} >*/}
            <Text style={[styles.title, {color: colors.text}]}>{translations['addTaskDateDueTitle']}</Text>
            <View style={styles.listItemView}>
                <TouchableOpacity onPress={() => setOpen(true)} >
                    <TextInput style={styles.input} editable={false}>
                        {checkDate(dateEnd) ? format(dateEnd, getFormat(), {locale: getLocale()}) : 'Select a date'}
                    </TextInput>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setOpen(true)} >
                    <Icon name="calendar" size={25} color={'#119ff7'}/>
                </TouchableOpacity>
            </View>
            {/*</TouchableOpacity>*/}
            <DatePicker
                androidVariant="nativeAndroid"
                title={translations['addTaskDatepickerTitle']}
                confirmText={translations['addTaskDatepickerConfirmText']}
                cancelText={translations['addTaskDatepickerCancelText']}
                modal
                locale={translations.getLanguage()}
                open={open}
                date={dateEnd}
                onConfirm={(dateEnd) => {
                    setOpen(false)
                    setDateEnd(dateEnd)
                    // console.log(dateEnd)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
            <Text style={[styles.title, {color: colors.text}]}>{translations['addTaskDetailTitle']}</Text>
            <TextInput
                placeholder={translations['addTaskDetailPlaceholder']}
                maxLength={80}
                multiline={true}
                placeholderTextColor={colors.textInput}
                style={styles.input}
                onChangeText={onChangeDetails}
                value={details}
            />
            <View style={styles.listItemView}>
                <Text style={[styles.title, {color: colors.text}]}>{translations['addTaskImageTitle']}</Text>
                {image !== null ?
                    <TouchableOpacity onPress={() => clearImage()}>
                        <Icon name='remove' size={25} color={'#e83a14'}/>
                    </TouchableOpacity> : null}

            </View>
            {/*<View style={{backgroundColor: 'lightgray', alignItems:"center",justifyContent: "center", margin:60, height:150, borderRadius:5}}>*/}
            {/*    <TouchableOpacity style={{alignItems: "center"}}>*/}
            {/*        <Icon name="image" size={60} color={'gray'}/>*/}
            {/*        <Text>Upload Photo</Text>*/}
            {/*    </TouchableOpacity>*/}
            {/*</View>*/}
            {image !== null ? (
                <Image source={{ uri: image.uri }} style={{backgroundColor: 'lightgray', alignItems:"center",justifyContent: "center", margin:15, height:300, borderRadius:5}} />
            ) :
                <View style={{flexDirection:"row", backgroundColor: 'lightgray', alignItems:"center",justifyContent: "space-around", margin:60, height:150, borderRadius:5}}>
                    <TouchableOpacity style={{alignItems: "center"}} onPress={selectImage}>
                        <Icon name="image" size={60} color={'gray'}/>
                        <Text>Upload Photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{alignItems: "center"}} onPress={takePhoto}>
                        <Icon name="camera" size={60} color={'gray'}/>
                        <Text>Take Photo</Text>
                    </TouchableOpacity>
                </View>}
            {uploading ? (
                <View style={styles.progressBarContainer}>
                    <Progress.Bar progress={transferred} width={300} />
                </View>
            ) : null
            }

            <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                    if (!text.trim()) {
                        alert('Please enter a title');
                        return;
                    }
                    // addItem(text, dateAdded, dateEnd, details);
                    // database().ref('/tasks').push({
                    //     completed: false,
                    //     text: text,
                    //     dateAdded: dateAdded.getTime(),
                    //     dateEnd: dateEnd.getTime(),
                    //     details: details,
                    // });
                    if(image !== null){
                        uploadImage();
                        firestore()
                            .collection('Tasks')
                            .add({
                                completed: false,
                                text: text,
                                dateAdded: dateAdded,
                                dateEnd: dateEnd,
                                details: details,
                                image: image.fileName,
                            }).then((ref) => {
                            console.log('Task added!', ref.id);
                        });
                    }else{
                        firestore()
                            .collection('Tasks')
                            .add({
                                completed: false,
                                text: text,
                                dateAdded: dateAdded,
                                dateEnd: dateEnd,
                                details: details,
                            }).then((ref) => {
                            console.log('Task added!', ref.id);
                        });
                    }
                    // getDownloadUrl()

                    setText('');
                    setDateEnd('');
                    navigation.goBack();
                }}>
                <Text style={styles.btnText}>
                    <Icon name="plus" size={20} /> {translations['addTaskButton']}
                </Text>
            </TouchableOpacity>
            {/*<View>*/}
            {/*    <Image source={{uri: photo}} style={{width:300, height:300}}/>*/}
            {/*    <Button title='pick photo' onPress={() => choosePhoto()}/>*/}
            {/*</View>*/}
            {/*<UploadScreen/>*/}

        </View>
    );
};

const styles = StyleSheet.create({
    title:{
        paddingLeft: 10,
        paddingTop: 10,
        fontSize: 15,
        fontWeight: "bold",
        color: 'black'
    },
    input: {
        height: 60,
        padding: 8,
        margin: 5,
        // backgroundColor: 'blue'
        color: '#119ff7'
    },
    btn: {
        backgroundColor: '#119ff7',
        padding: 9,
        marginHorizontal: 15,
        borderRadius:5,
    },
    btnText: {
        color: '#ffffff',
        fontSize: 20,
        textAlign: 'center',
    },
    listItemView: {
        // paddingLeft: 25,
        paddingRight: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: 'red'
    },
    selectButton: {
        borderRadius: 5,
        width: 150,
        height: 50,
        backgroundColor: '#8ac6d1',
        alignItems: 'center',
        justifyContent: 'center'
    },
    uploadButton: {
        borderRadius: 5,
        width: 150,
        height: 50,
        backgroundColor: '#ffb6b9',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    imageContainer: {
        marginTop: 30,
        marginBottom: 50,
        alignItems: 'center'
    },
    progressBarContainer: {
        marginTop: 20
    },
    imageBox: {
        width: 200,
        // height: 600,
        maxHeight:1000,
    }
});

export default AddTask;
