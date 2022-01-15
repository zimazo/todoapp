import React, {useContext} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from "@react-navigation/native";
import {LocalizationContext, LocalizationProvider} from "./components/Translations";

import {AddTaskScreen} from "./screens/AddTaskScreen";
import {TaskDetailsScreen} from "./screens/TaskDetailsScreen";
import {SettingsScreen} from "./screens/SettingsScreen";
import {SettingsLanguageScreen} from "./screens/SettingsLanguageScreen";
import {HomeScreen} from "./screens/HomeScreen";


const Stack = createNativeStackNavigator();

const App = () => {
    const {translations, initializeAppLanguage} = useContext(LocalizationContext);
    initializeAppLanguage();

    return (
        <NavigationContainer>
            <LocalizationProvider>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={() => ({
                            headerTitle: translations['homeScreen'],
                            headerStyle: {
                                backgroundColor: '#119ff7',
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                        })}/>
                    <Stack.Screen
                        name="AddTask"
                        component={AddTaskScreen}
                        options={() => ({
                            headerTitle: translations['addTaskScreen'],
                            headerStyle: {
                                backgroundColor: '#119ff7',
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                        })}
                    />
                    <Stack.Screen name="Details" component={TaskDetailsScreen} options={() => ({
                        headerTitle: translations['detailsScreen'],
                        headerStyle: {
                            backgroundColor: '#119ff7',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    })}
                    />
                    <Stack.Screen name="Settings" component={SettingsScreen} options={() => ({
                        headerTitle: translations['settingsScreen'],
                        headerStyle: {
                            backgroundColor: '#119ff7',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    })}
                    />
                    <Stack.Screen name="SettingsLanguage" component={SettingsLanguageScreen} options={() => ({
                        headerTitle: translations['languageSetting'],
                        headerStyle: {
                            backgroundColor: '#119ff7',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    })}
                    />
                </Stack.Navigator>
            </LocalizationProvider>
        </NavigationContainer>
    );
};


// function HomeScreen({ navigation }) {
//     const {translations, initializeAppLanguage} = useContext(LocalizationContext);
//     initializeAppLanguage();
//
//     // const [items, setItems] = useState([
//     //     {
//     //         id: uuid.v4(),
//     //         completed: false,
//     //         text: 'Clean the house',
//     //         dateAdded: new Date().toLocaleString(),
//     //         dateEnd: new Date().toLocaleString(),
//     //         details: 'I really should do some cleaning around here',
//     //         image: null
//     //     },
//     //     {
//     //         id: uuid.v4(),
//     //         completed: false,
//     //         text: 'Wash the dishes',
//     //         dateAdded: new Date().toLocaleString(),
//     //         dateEnd: new Date().toLocaleString(),
//     //         details: 'They have been piling up for a week now',
//     //         image: null
//     //     },
//     //     {
//     //         id: uuid.v4(),
//     //         completed: false,
//     //         text: 'Bake cookies',
//     //         dateAdded: new Date().toLocaleString(),
//     //         dateEnd: new Date().toLocaleString(),
//     //         details: 'I love cookies',
//     //         image: null
//     //     },
//     //     {
//     //         id: uuid.v4(),
//     //         completed: false,
//     //         text: 'Play videogames',
//     //         dateAdded: new Date().toLocaleString(),
//     //         dateEnd: new Date().toLocaleString(),
//     //         details: 'Time to chill',
//     //         image: null
//     //     },
//     //     {
//     //         id: uuid.v4(),
//     //         completed: true,
//     //         text: 'Watch Tv',
//     //         dateAdded: new Date().toLocaleString(),
//     //         dateEnd: new Date().toLocaleString(),
//     //         details: '',
//     //         image: null
//     //     },
//     // ]);
//     const [items, setItems] = useState([]);
//     const [showCompleted, setShowCompleted] = useState(true);
//     const [refresh, setRefresh] = useState(true);
//     // let showCompleted = false
//
//     const update = () => {
//         setRefresh(!refresh)
//     }
//
//     React.useLayoutEffect(() => {
//         navigation.setOptions({
//             headerRight: () => (
//                 <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
//                     <View style={{justifyContent: 'space-between', alignItems: 'center', padding: 7, marginRight:-10}}>
//                         <Icon name="cog" size={25} color='black'/>
//                     </View>
//                 </TouchableOpacity>
//             ),
//             // headerLeft: () => (
//             //     <TouchableOpacity onPress={() => {console.log('before set: ' + refresh); useEffect(setShowCompleted(showCompleted));  setRefresh(!refresh); setItems(items) ; console.log('after set: ' + refresh);}}>
//             //         <View style={{justifyContent: 'space-between', alignItems: 'center', padding: 7, marginRight:10}}>
//             //             <Icon name="chevron-down" size={25} color='black'/>
//             //         </View>
//             //     </TouchableOpacity>
//             // ),
//         });
//     }, [navigation]);
//     const deleteItem = id => {
//         // setItems(prevItems => {
//         //     update()
//         //     return prevItems.filter(item => item.id !== id);
//         // });
//         firestore()
//             .collection('Tasks')
//             .doc(id)
//             .delete()
//             .then(() => {
//                 console.log('Task' + id + 'deleted!');
//             });
//
//     };
//
//     // const addItem = (text, dateAdded, dateEnd, details) => {
//     //     setItems(prevItems => {
//     //         return [{id: uuid.v4(), completed: false, text, dateAdded, dateEnd, details}, ...prevItems];
//     //     });
//     // };
//
//     const switchCompleted = (item) => {
//         // update()
//         // item.completed = !item.completed
//         firestore()
//             .collection('Tasks')
//             .doc(item.id)
//             .update({
//                 completed: !item.completed,
//             })
//             .then(() => {
//                 console.log('Task' + item.completed ? 'Completed' : 'Un-Completed');
//             });
//     };
//     const messageEmptyList = () => {
//         return (
//             <View style={{alignItems:"center", justifyContent: "center", marginTop: '50%' }}>
//                 <Icon name="ban" size={170} />
//                 {showCompleted ? <Text style={{fontSize: 32, fontWeight: "bold"}}>Empty!</Text> : <Text style={{fontSize: 32, fontWeight: "bold"}}>All done!</Text>}
//                 {/*<Text style={{fontSize: 32, fontWeight: "bold"}}>All done!</Text>*/}
//             </View>
//         );
//     };
//
//     const [loading, setLoading] = useState(true); // Set loading to true on component mount
//
//     useEffect(() => {
//         const subscriber = firestore()
//             .collection('Tasks')
//             .onSnapshot(querySnapshot => {
//                 const users = [];
//
//                 querySnapshot.forEach(documentSnapshot => {
//                     console.log(documentSnapshot.id);
//                     const data = documentSnapshot.data()
//
//                     // adding new property id with id from Firestore
//                     data.id = documentSnapshot.id
//                     users.push({
//                         ...documentSnapshot.data(),
//                         // key: documentSnapshot.id,
//                     });
//                 });
//
//                 setItems(users);
//                 setLoading(false);
//             });
//
//         // Unsubscribe from events when no longer in use
//         return () => subscriber();
//     }, []);
//
//     if (loading) {
//         return <ActivityIndicator />;
//     }
//
//     return(
//         <View style={styles.container}>
//             <View style={{flex: 12}}>
//                 {/*<Users/>*/}
//                 <FlatList
//                     data={items.filter(temp => temp.completed === showCompleted)}
//                     // data={items}
//                     ListEmptyComponent={messageEmptyList}
//                     renderItem={({item}) => (
//                         <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('Details', {
//                             item: item,
//                             deleteItem: deleteItem,
//                             switchCompleted: switchCompleted,
//                             update: update,
//                         })}>
//                             <ListTask
//                                 item={item}
//                                 deleteItem={deleteItem}
//                                 markAsDone={switchCompleted}
//                                 showCompleted={showCompleted}
//                                 update={update}
//                             />
//                         </TouchableOpacity>
//                     )}
//                     keyExtractor={(item) => item.id}
//                     extraData={refresh}
//                 />
//                 <TouchableOpacity
//                     style={styles.btn}
//                     onPress={() => navigation.navigate('AddTask')}>
//                     <Icon style={{alignSelf: 'center', color: "#119ff7"}} name="plus" size={30} />
//                 </TouchableOpacity>
//             </View>
//             <View style={{flex: 1, flexDirection: "row", justifyContent: "space-evenly"}}>
//                 <TouchableOpacity style={showCompleted ? styles.buttonHomeBottom : styles.buttonHomeBottomSelected} onPress={() => {console.log('before set: ' + refresh); setShowCompleted(false); update(); setItems(items) ; console.log('after set: ' + refresh);}}>
//                     <View style={{justifyContent: 'space-between', alignItems: 'center', padding: 7, marginRight:10}}>
//                         <Icon name="list" size={25} color='black'/>
//                         <Text style={styles.buttonText}>{translations['toDo']}</Text>
//                     </View>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={showCompleted ? styles.buttonHomeBottomSelected : styles.buttonHomeBottom} onPress={() => {console.log('before set: ' + refresh); setShowCompleted(true); update(); setItems(items) ; console.log('after set: ' + refresh);}}>
//                     <View style={{justifyContent: 'space-between', alignItems: 'center', padding: 7, marginRight:10}}>
//                         <Icon name="check" size={25} color='black'/>
//                         <Text style={styles.buttonText}>{translations['completed']}</Text>
//                     </View>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     )
// }

// function SettingsLanguageScreen() {
//     const {
//         translations,
//         appLanguage,
//         setAppLanguage,
//         initializeAppLanguage,
//     } = useContext(LocalizationContext); // 1
//     initializeAppLanguage(); // 2
//
//     return(
//         <View>
//             {translations.getAvailableLanguages().map((currentLang, i) => (
//                 <ListItem key={i} bottomDivider onPress={() => {setAppLanguage(currentLang);}}>
//                     <ListItem.Content>
//                         <ListItem.Title>{currentLang === 'en' ? translations['languageEnglish'] : translations['languageSlovak']}</ListItem.Title>
//                         {/*<ListItem.CheckBox>{appLanguage === currentLang}</ListItem.CheckBox>*/}
//                         {/*<View style={{justifyContent: "space-around", alignItems: "center", flexDirection: "row"}}>*/}
//                         {/*    <ListItem.Title>{currentLang}</ListItem.Title>*/}
//                         {/*</View>*/}
//                     </ListItem.Content>
//                     {appLanguage === currentLang ? <Icon name="check" size={21} color={"#119ff7"}/> : null}
//                 </ListItem>
//             ))}
//         </View>
//         )
// }

// const styles = StyleSheet.create({
//     buttonHomeBottom: {
//         alignItems: "center",
//         justifyContent: "center",
//         backgroundColor: 'white',
//         // borderRadius: 8,
//         // borderWidth: 2,
//         width: '50%',
//     },
//     buttonHomeBottomSelected: {
//         alignItems: "center",
//         justifyContent: "center",
//         backgroundColor: "#119ff7",
//         // borderRadius: 8,
//         // borderWidth: 2,
//         width: '50%',
//     },
//     buttonDetailBottom: {
//         alignItems: "center",
//         justifyContent: "center",
//         backgroundColor: 'white',
//         borderRadius: 8,
//         borderWidth: 2,
//         width: 150,
//     },
//     buttonText: {
//         color: 'black',
//     },
//     image: {
//         marginTop:10,
//         marginLeft: 14,
//         // aspectRatio: 16/9,
//         // maxWidth: 307.2,
//         // maxHeight: 172.8,
//         width: 307.2,
//         height: 172.8,
//         // backgroundColor: 'green',
//         // marginBottom: -100,
//
//     },
//     detail: {
//         marginHorizontal: 30,
//         marginVertical: 18,
//         paddingBottom: 0,
//     },
//     detailsTextTitle: {
//         fontSize: 18,
//         fontWeight: "bold",
//         color:'black'
//     },
//     detailsText: {
//         color: 'black',
//         marginTop:10,
//         marginLeft: 15,
//     },
//     detailsIsCompletedText: {
//         color: 'green',
//         marginTop:10,
//         marginLeft: 15,
//     },
//     detailsIsNotCompletedText: {
//         color: '#db4412',
//         marginTop:10,
//         marginLeft: 15,
//     },
//     setting: {
//       margin: 30
//     },
//     settingItems: {
//         justifyContent: 'space-between',
//         flexDirection: "row",
//     },
//     settingTextTitle: {
//         fontSize: 18,
//         fontWeight: "bold",
//         color: 'black'
//     },
//     settingText: {
//         fontSize: 12,
//     },
//     listItem: {
//         padding: 15,
//         backgroundColor: '#f3f3f3',
//         borderColor: '#9e9e9e',
//         borderWidth: 2,
//         borderRadius: 4,
//         marginVertical: 3,
//         marginHorizontal: 12,
//     },
//     container: {
//         flex: 1,
//         backgroundColor: 'white',
//     },
//     btn: {
//         backgroundColor: 'white',
//         marginBottom: 20,
//         borderRadius: 100,
//         width: 70,
//         height: 70,
//         alignSelf: "center",
//         justifyContent: "center",
//         position: "absolute",
//         bottom: 5,
//         right: 20,
//         shadowColor: "#000",
//         shadowOffset: {
//             width: 0,
//             height: 4,
//         },
//         shadowOpacity: 0.32,
//         shadowRadius: 5.46,
//
//         elevation: 4,
//     },
// });

export default App;
