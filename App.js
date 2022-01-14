import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {View, StyleSheet, FlatList, Text, TouchableOpacity, Button, Alert, Image, ScrollView} from 'react-native';

import ListTask from './components/ListTask';
import uuid from 'react-native-uuid';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from "@react-navigation/native";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import {ListItem} from 'react-native-elements'
import {LocalizationContext, LocalizationProvider} from "./components/Translations";

import {AddTaskScreen} from "./screens/AddTaskScreen";
import {TaskDetailsScreen} from "./screens/TaskDetailsScreen";
import {SettingsScreen} from "./screens/SettingsScreen";

// let strings = new LocalizedStrings({
//     en:{
//         /*MAIN*/
//         homeScreen:"Your Tasks",
//         toDo:"To Do",
//         completed:"Completed",
//         addTaskScreen:"Create a Task",
//         detailsScreen:"Details",
//         settingsScreen:"Settings",
//         settingsLanguageScreen:"Language",
//         /*SETTINGS*/
//         languageSetting:"Language",
//         languageSettingDetail:"Select a language",
//         darkModeSetting:"Dark Mode",
//         darkModeSettingDetail:"A darker theme, easier on the eyes",
//         /*ADD TASK*/
//         addTaskTextTitle:"Title",
//         addTaskTextPlaceholder:"Enter task title...",
//         addTaskDateDueTitle:"Date Due",
//         addTaskDetailTitle:"Select a date",
//         addTaskDetailPlaceholder:"put in some details",
//         addTaskButton:"Add Task",
//         /*DETAILS*/
//         detailsTitle:"Title:",
//         detailsStatus:"Status:",
//         detailsDetails:"Details:",
//         detailsDateAdded:"Added on:",
//         detailsDateEnd:"Deadline:",
//         detailsImage:"Image:",
//         detailsButtonComplete:"Complete",
//         detailsButtonUncomplete:"Un-Complete",
//         detailsButtonEdit:"Edit",
//         detailsDeleteTitle:"Delete Task",
//         detailsDeleteMessage:"Are you sure you want to delete this task?",
//         detailsDeleteText1:"Yes",
//         detailsDeleteText2:"Cancel",
//         detailsStatusCompleted:"Completed",
//         detailsStatusNotCompleted:"Not Completed",
//     },
//     sk: {
//         /*MAIN*/
//         homeScreen:"Tvoje Úlohy",
//         toDo:"Nedokončené",
//         completed:"Dokončené",
//         addTaskScreen:"Nová Úloha",
//         detailsScreen:"Detaily Úlohy",
//         settingsScreen:"Nastavenia",
//         settingsLanguageScreen:"Jazyk",
//         /*SETTINGS*/
//         languageSetting:"Jazyk",
//         languageSettingDetail:"Vyberte jazyk",
//         darkModeSetting:"Tmavý mód",
//         darkModeSettingDetail:"Tmavšý mód, menej náročný na oči",
//         /*ADD TASK*/
//         addTaskTextTitle:"Názov",
//         addTaskTextPlaceholder:"Pridajte názov úlohy",
//         addTaskDateDueTitle:"Splniť do",
//         addTaskDetailTitle:"Poznámky",
//         addTaskDetailPlaceholder:"pridajte nejaké detaily",
//         addTaskButton:"Pridať úlohu",
//         /*DETAILS*/
//         detailsTitle:"Názov:",
//         detailsStatus:"Stav:",
//         detailsDetails:"Poznámky:",
//         detailsDateAdded:"Pridané:",
//         detailsDateEnd:"Dokončiť do:",
//         detailsImage:"Obrázok:",
//         detailsButtonComplete:"Dokončiť",
//         detailsButtonUncomplete:"Obnoviť",
//         detailsButtonEdit:"Upraviť",
//         detailsDeleteTitle:"Vymazať Úlohu",
//         detailsDeleteMessage:"Naozaj chcete vymazať túto úlohu?",
//         detailsDeleteText1:"Áno",
//         detailsDeleteText2:"Zrušiť",
//         detailsStatusCompleted:"Splnené",
//         detailsStatusNotCompleted:"Nesplnené",
//     }
// });

// const changeLanguage = (languageKey) => {
//     strings.setLanguage(languageKey);
// }

const Stack = createNativeStackNavigator();

const App = () => {
    const {translations, initializeAppLanguage} = useContext(LocalizationContext);
    initializeAppLanguage(); // 1
    return (
        <NavigationContainer>
            <LocalizationProvider>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={() => ({
                            headerTitle: translations['homeScreen']})}/>
                    <Stack.Screen
                        name="AddTask"
                        component={AddTaskScreen}
                        options={() => ({
                            headerTitle: translations['addTaskScreen']})}
                    />
                    <Stack.Screen name="Details" component={TaskDetailsScreen} options={() => ({
                        headerTitle: translations['detailsScreen']})}
                    />
                    <Stack.Screen name="Settings" component={SettingsScreen} options={() => ({
                        headerTitle: translations['settingsScreen']})}
                    />
                    <Stack.Screen name="SettingsLanguage" component={SettingsLanguageScreen} options={() => ({
                        headerTitle: translations['languageSetting']})}
                    />
                </Stack.Navigator>
            </LocalizationProvider>
        </NavigationContainer>
    );
};

function HomeScreen({ navigation }) {
    const {translations, initializeAppLanguage} = useContext(LocalizationContext);
    initializeAppLanguage();
    const [items, setItems] = useState([
        {
            id: uuid.v4(),
            completed: false,
            text: 'Clean the house',
            dateAdded: 'Fri Jan  7 16:11:34 2022',
            dateEnd: 'Fri Jan  7 16:40:00 2022',
            details: 'I really should do some cleaning around here',
            image: null
        },
        {
            id: uuid.v4(),
            completed: false,
            text: 'Wash the dishes',
            dateAdded: 'Fri Jan  7 16:12:45 2022',
            dateEnd: 'Fri Jan  7 16:55:00 2022',
            details: 'They have been piling up for a week now',
            image: null
        },
        {
            id: uuid.v4(),
            completed: false,
            text: 'Bake cookies',
            dateAdded: 'Fri Jan  7 16:14:11 2022',
            dateEnd: 'Fri Jan  7 19:30:00 2022',
            details: 'I love cookies',
            image: null
        },
        {
            id: uuid.v4(),
            completed: false,
            text: 'Play videogames',
            dateAdded: 'Fri Jan  7 16:18:02 2022',
            dateEnd: 'Fri Jan  7 22:00:00 2022',
            details: 'Time to chill',
            image: null
        },
        {
            id: uuid.v4(),
            completed: true,
            text: 'Watch Tv',
            dateAdded: 'Fri Jan  8 18:18:02 2022',
            dateEnd: 'Fri Jan  8 23:59:59 2022',
            details: '',
            image: null
        },
    ]);
    const [showCompleted, setShowCompleted] = useState(true);
    const [refresh, setRefresh] = useState(true);
    // let showCompleted = false

    const update = () => {
        setRefresh(!refresh)
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                    <View style={{justifyContent: 'space-between', alignItems: 'center', padding: 7, marginRight:-10}}>
                        <Icon name="cog" size={25} color='black'/>
                    </View>
                </TouchableOpacity>
            ),
            // headerLeft: () => (
            //     <TouchableOpacity onPress={() => {console.log('before set: ' + refresh); useEffect(setShowCompleted(showCompleted));  setRefresh(!refresh); setItems(items) ; console.log('after set: ' + refresh);}}>
            //         <View style={{justifyContent: 'space-between', alignItems: 'center', padding: 7, marginRight:10}}>
            //             <Icon name="chevron-down" size={25} color='black'/>
            //         </View>
            //     </TouchableOpacity>
            // ),
        });
    }, [navigation]);
    const deleteItem = id => {
        setItems(prevItems => {
            update()
            return prevItems.filter(item => item.id !== id);
        });

    };
    const addItem = (text, dateAdded, dateEnd, details) => {
        setItems(prevItems => {
            return [{id: uuid.v4(), completed: false, text, dateAdded, dateEnd, details}, ...prevItems];
        });
    };
    const markAsDone = (item) => {
        update()
        item.completed = !item.completed
    };
    const messageEmptyList = () => {
        return (
            <View style={{alignItems:"center", justifyContent: "center", marginTop: '50%' }}>
                <Icon name="ban" size={170} />
                {showCompleted ? <Text style={{fontSize: 32, fontWeight: "bold"}}>Empty!</Text> : <Text style={{fontSize: 32, fontWeight: "bold"}}>All done!</Text>}
                {/*<Text style={{fontSize: 32, fontWeight: "bold"}}>All done!</Text>*/}
            </View>
        );
    };

    return(
        <View style={styles.container}>
            <View style={{flex: 12}}>
                <FlatList
                    data={items.filter(temp => temp.completed === showCompleted)}
                    // data={items}
                    ListEmptyComponent={messageEmptyList}
                    renderItem={({item}) => (
                        <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('Details', {
                            item: item,
                            deleteItem: deleteItem,
                            update: update,
                        })}>
                            <ListTask
                                item={item}
                                deleteItem={deleteItem}
                                markAsDone={markAsDone}
                                showCompleted={showCompleted}
                                update={update}
                            />
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id}
                    extraData={refresh}
                />
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => navigation.navigate('AddTask', {
                        addItem: addItem,
                    })}>
                    <Icon style={{alignSelf: 'center', color: "#119ff7"}} name="plus" size={30} />
                </TouchableOpacity>
            </View>
            <View style={{flex: 1, flexDirection: "row", justifyContent: "space-evenly"}}>
                <TouchableOpacity style={showCompleted ? styles.buttonHomeBottom : styles.buttonHomeBottomSelected} onPress={() => {console.log('before set: ' + refresh); setShowCompleted(false); update(); setItems(items) ; console.log('after set: ' + refresh);}}>
                    <View style={{justifyContent: 'space-between', alignItems: 'center', padding: 7, marginRight:10}}>
                        <Icon name="list" size={25} color='black'/>
                        <Text style={styles.buttonText}>{translations['toDo']}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={showCompleted ? styles.buttonHomeBottomSelected : styles.buttonHomeBottom} onPress={() => {console.log('before set: ' + refresh); setShowCompleted(true); update(); setItems(items) ; console.log('after set: ' + refresh);}}>
                    <View style={{justifyContent: 'space-between', alignItems: 'center', padding: 7, marginRight:10}}>
                        <Icon name="check" size={25} color='black'/>
                        <Text style={styles.buttonText}>{translations['completed']}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

// function AddTaskScreen({ navigation, route }) {
//     const { addItem, strings } = route.params;
//     return(
//         <AddItem addItem={addItem} navigation={navigation} strings={strings}/>
//     )
// }

// function TaskDetailsScreen({ navigation, route }) {
//     const { item, deleteItem, update } = route.params;
//
//     const [isCompleted, setIsCompleted] = useState(item.completed);
//
//     const viewCompleted = () => {
//         return(
//             <View style={{flexDirection: "row", justifyContent: "space-around", marginHorizontal: 30, marginVertical: 18}}>
//                 <TouchableOpacity style={styles.buttonDetailBottom} onPress={() => {setIsCompleted(false); item.completed = false; update()}}>
//                     <Icon name="times" size={50} color='#db4412'/>
//                     <Text style={styles.buttonText}>{strings.detailsButtonUncomplete}</Text>
//                 </TouchableOpacity>
//             </View>
//         )
//     }
//
//     const viewNotCompleted = () => {
//         return(
//             <View style={{flexDirection: "row", justifyContent: "space-around", marginHorizontal: 30, marginVertical: 18}}>
//                 <TouchableOpacity style={styles.buttonDetailBottom}>
//                     <Icon name="edit" size={50} color='blue'/>
//                     <Text style={styles.buttonText}>{strings.detailsButtonEdit}</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.buttonDetailBottom} onPress={() => {setIsCompleted(true); item.completed = true; update()}}>
//                     <Icon name="check" size={50} color='green'/>
//                     <Text style={styles.buttonText}>{strings.detailsButtonComplete}</Text>
//                 </TouchableOpacity>
//             </View>
//         )
//     }
//
//     const deleteAndGoBack = () => {
//         Alert.alert(
//             strings.detailsDeleteTitle,
//             strings.detailsDeleteMessage,
//             [
//                 {
//                     text: strings.detailsDeleteText1,
//                     onPress: () => {deleteItem(item.id); navigation.goBack()},
//                 },
//                 {
//                     text: strings.detailsDeleteText2,
//                 },
//             ],
//             {
//                 cancelable: true,
//             })
//     }
//
//     React.useLayoutEffect(() => {
//         navigation.setOptions({
//             headerTitle: strings.detailsScreen + ' (' + item.text + ')',
//             headerRight: () => (
//                 <TouchableOpacity onPress={() => deleteAndGoBack()}>
//                     <View style={{justifyContent: 'space-between', alignItems: 'center', padding: 7, marginRight:-10}}>
//                         <Icon name="trash" size={25} color='red'/>
//                     </View>
//                 </TouchableOpacity>
//             ),
//         });
//     }, [navigation]);
//
//     return(
//         // <View style={styles.container}>
//         <ScrollView style={styles.container}>
//             <View style={styles.detail}>
//                 <Text style={styles.detailsTextTitle}>{strings.detailsTitle}</Text>
//                 <Text style={styles.detailsText}>{item.text}</Text>
//             </View>
//             <View style={styles.detail}>
//                 <Text style={styles.detailsTextTitle}>{strings.detailsStatus}</Text>
//                 <Text style={isCompleted ? styles.detailsIsCompletedText : styles.detailsIsNotCompletedText}>{isCompleted ? strings.detailsStatusCompleted : strings.detailsStatusNotCompleted}</Text>
//             </View>
//             <View style={styles.detail}>
//                 <Text style={styles.detailsTextTitle}>{strings.detailsDetails}</Text>
//                 <Text style={styles.detailsText}>{item.details}</Text>
//             </View>
//             <View style={styles.detail}>
//                 <Text style={styles.detailsTextTitle}>{strings.detailsDateAdded}</Text>
//                 <Text style={styles.detailsText}>{item.dateAdded}</Text>
//             </View>
//             <View style={styles.detail}>
//                 <Text style={styles.detailsTextTitle}>{strings.detailsDateEnd}</Text>
//                 <Text style={styles.detailsText}>{item.dateEnd}</Text>
//             </View>
//             <View style={styles.detail}>
//                 <Text style={styles.detailsTextTitle}>{strings.detailsImage}</Text>
//                 <Image style={styles.image} resizeMode='cover' source={require('./assets/img_1.png')}/>
//             </View >
//             {isCompleted ? viewCompleted() : viewNotCompleted()}
//         </ScrollView>
//         // {/*</View>*/}
//
//     )
// }

// function SettingsScreen({navigation}) {
//
//     const [isEnabled, setIsEnabled] = useState(false);
//     const toggleSwitch = () => setIsEnabled(previousState => !previousState);
//
//     return(
//         <View style={styles.container}>
//             <TouchableOpacity style={styles.setting} onPress={() => navigation.navigate('SettingsLanguage')}>
//                 <View style={styles.settingItems}>
//                     <View>
//                         <View>
//                             <Text style={styles.settingTextTitle}>{strings.languageSetting}</Text>
//                         </View>
//                         <View>
//                             <Text style={styles.settingText}>{strings.languageSettingDetail}</Text>
//                         </View>
//                     </View>
//                     <View style={{justifyContent: "center"}}>
//                         <Icon name="chevron-right" size={20} />
//                     </View>
//                 </View>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.setting} onPress={() => toggleSwitch()}>
//                 <View style={styles.settingItems}>
//                     <View>
//                         <View>
//                             <Text style={styles.settingTextTitle}>{strings.darkModeSetting}</Text>
//                         </View>
//                         <View>
//                             <Text style={styles.settingText}>{strings.darkModeSettingDetail}</Text>
//                         </View>
//                     </View>
//                     <View style={{justifyContent: "center"}}>
//                         <Switch
//                             // trackColor={{ false: "#767577", true: "#81b0ff" }}
//                             // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
//                             // ios_backgroundColor="#3e3e3e"
//                             onValueChange={toggleSwitch}
//                             value={isEnabled}
//                         />
//                     </View>
//                 </View>
//             </TouchableOpacity>
//             {/*<Button title='wdwa' onPress={() => navigation.navigate('SettingsLanguage')}/>*/}
//         </View>
//     )
// }

function SettingsLanguageScreen(navigation) {
    const {
        translations,
        appLanguage,
        setAppLanguage,
        initializeAppLanguage,
    } = useContext(LocalizationContext); // 1
    initializeAppLanguage(); // 2

    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //         headerRight: () => (
    //             <Icon
    //                 name='more'
    //                 color='white'
    //                 size={30}/>
    //         ),
    //     });
    // }, [navigation]);

    return(
        <View>
            {translations.getAvailableLanguages().map((currentLang, i) => (
                <ListItem key={i} bottomDivider onPress={() => {setAppLanguage(currentLang);}}>
                    <ListItem.Content>
                        <ListItem.Title>{currentLang === 'en' ? translations['languageEnglish'] : translations["languageSlovak"]}</ListItem.Title>
                        {/*<ListItem.CheckBox>{appLanguage === currentLang}</ListItem.CheckBox>*/}
                        {/*<View style={{justifyContent: "space-around", alignItems: "center", flexDirection: "row"}}>*/}
                        {/*    <ListItem.Title>{currentLang}</ListItem.Title>*/}
                        {/*</View>*/}
                    </ListItem.Content>
                    {appLanguage === currentLang ? <Icon name="check" size={21} color={"#119ff7"}/> : null}
                </ListItem>
            ))}
        </View>
        )
}

const styles = StyleSheet.create({
    buttonHomeBottom: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'white',
        // borderRadius: 8,
        // borderWidth: 2,
        width: '50%',
    },
    buttonHomeBottomSelected: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#119ff7",
        // borderRadius: 8,
        // borderWidth: 2,
        width: '50%',
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
        marginVertical: 18,
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
    listItem: {
        padding: 15,
        backgroundColor: '#f3f3f3',
        borderColor: '#9e9e9e',
        borderWidth: 2,
        borderRadius: 4,
        marginVertical: 3,
        marginHorizontal: 12,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    btn: {
        backgroundColor: 'white',
        marginBottom: 20,
        borderRadius: 100,
        width: 70,
        height: 70,
        alignSelf: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: 5,
        right: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 4,
    },
});

export default App;
