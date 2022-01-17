import React, {useContext, useEffect, useState} from "react";
import {LocalizationContext} from "../components/Translations";
import {ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import firestore from "@react-native-firebase/firestore";
import ListTask from "../components/ListTask";
import {useTheme} from "../theme/ThemeProvider";

export function HomeScreen({ navigation }) {
    const {translations, initializeAppLanguage} = useContext(LocalizationContext);
    initializeAppLanguage();

    const {colors, isDark} = useTheme();

    const [items, setItems] = useState([]);
    const [showCompleted, setShowCompleted] = useState(true);
    const [refresh, setRefresh] = useState(true);

    const update = () => {
        setRefresh(!refresh)
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{flexDirection:"row" }}>
                    {/*<TouchableOpacity onPress={() => deleteAllCompletedAlert()}>*/}
                    {/*    <View style={{ alignItems: 'center', padding: 7, marginRight:5}}>*/}
                    {/*        <Icon name="trash" size={25} color='#f4511e'/>*/}
                    {/*    </View>*/}
                    {/*</TouchableOpacity>*/}
                    <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                        <View style={{ alignItems: 'center', padding: 7, marginRight:-10}}>
                            <Icon name="cog" size={25} color='white'/>
                        </View>
                    </TouchableOpacity>
                </View>
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
        // setItems(prevItems => {
        //     update()
        //     return prevItems.filter(item => item.id !== id);
        // });
        firestore()
            .collection('Tasks')
            .doc(id)
            .delete()
            .then(() => {
                console.log('Task' + id + 'deleted!');
            });

    };

    const deleteAllCompletedAlert = () => {
        Alert.alert(
            translations['deleteAllTitle'],
            translations['deleteAllMessage'],
            [
                {
                    text: translations['deleteAllText1'],
                    onPress: () => deleteAllCompleted(),
                },
                {
                    text: translations['deleteAllText2'],
                },
            ],
            {
                cancelable: true,
            }
        )
    }

    const deleteAllCompleted = () => {

        firestore().collection('Tasks').where('completed','==',true).get()
            .then(function(querySnapshot) {
                // Once we get the results, begin a batch
                const batch = firestore().batch();

                querySnapshot.forEach(function(doc) {
                    // For each doc, add a delete operation to the batch
                    batch.delete(doc.ref);
                });

                // Commit the batch
                return batch.commit();
            }).then(function() {
            // Delete completed!
            // ...
        });
    };

    const switchCompleted = (item) => {
        // update()
        // item.completed = !item.completed
        firestore()
            .collection('Tasks')
            .doc(item.id)
            .update({
                completed: !item.completed,
            })
            .then(() => {
                console.log('Task' + item.completed ? 'Completed' : 'Un-Completed');
            });
    };
    const messageEmptyList = () => {
        return (
            <View style={{alignItems:"center", justifyContent: "center", marginTop: '50%' }}>
                <Icon name="smile-o" color='lightgray' size={150} />
                {/*<FontAwesomeIcon icon="fa-thin fa-umbrella-beach" />*/}
                {showCompleted ? <Text style={{fontSize: 32, fontWeight: "bold", color: 'lightgray'}}>Empty!</Text> : <Text style={{fontSize: 32, fontWeight: "bold", color: 'lightgray'}}>All done!</Text>}
                {/*<Text style={{fontSize: 32, fontWeight: "bold"}}>All done!</Text>*/}
            </View>
        );
    };

    const [loading, setLoading] = useState(true); // Set loading to true on component mount

    useEffect(() => {
        const subscriber = firestore()
            .collection('Tasks')
            .onSnapshot(querySnapshot => {
                const tasks = [];

                querySnapshot.forEach(documentSnapshot => {
                    console.log(documentSnapshot.id);
                    const data = documentSnapshot.data()

                    // adding new property id with id from Firestore
                    data.id = documentSnapshot.id
                    tasks.push({
                        ...documentSnapshot.data(),
                        // key: documentSnapshot.id,
                    });
                });

                setItems(tasks);
                setLoading(false);
            });

        // Unsubscribe from events when no longer in use
        return () => subscriber();
    }, []);

    if (loading) {
        return <ActivityIndicator />;
    }

    return(
        <View style={[styles.container, {backgroundColor: colors.background}]}>
            <View style={{flex: 12}}>
                {/*<Users/>*/}
                <FlatList
                    data={items.filter(temp => temp.completed === showCompleted)}
                    // data={items}
                    ListEmptyComponent={messageEmptyList}
                    renderItem={({item}) => (
                        // <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('Details', {
                        //     item: item,
                        //     deleteItem: deleteItem,
                        //     switchCompleted: switchCompleted,
                        //     update: update,
                        // })}>
                        <ListTask
                            item={item}
                            deleteItem={deleteItem}
                            switchCompleted={switchCompleted}
                            showCompleted={showCompleted}
                            update={update}
                            navigation={navigation}
                        />
                        // </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id}
                    extraData={refresh}
                />
                <View style={{position: 'absolute', left: 0, right: 0, bottom: -10, alignItems: 'center'}}>
                    {showCompleted ?
                        (<TouchableOpacity style={[styles.btn, {backgroundColor: "red"}]} onPress={() => deleteAllCompletedAlert()}>
                            <Icon name="trash" size={25} color='white'/>
                        </TouchableOpacity>) :
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => navigation.navigate('AddTask')}>
                            <Icon style={{color: "white"}} name="plus" size={32} />
                        </TouchableOpacity>}


                </View>
            </View>
            <View style={{flex: 1, flexDirection: "row", justifyContent: "space-evenly"}}>
                <TouchableOpacity style={showCompleted ? [styles.buttonHomeBottom, {backgroundColor: colors.background}] : styles.buttonHomeBottomSelected} onPress={() => {console.log('before set: ' + refresh); setShowCompleted(false); update(); setItems(items) ; console.log('after set: ' + refresh);}}>
                    <View style={{justifyContent: 'space-between', alignItems: 'center', padding: 7, marginRight:10}}>
                        <Icon name="list" size={25} color={showCompleted ? (isDark ? '#ffffff' : '#1c1b1b') : '#ffffff'}/>
                        <Text style={showCompleted ? [styles.buttonText, {color: colors.text}] : styles.buttonTextSelected}>{translations['toDo']}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={showCompleted ? styles.buttonHomeBottomSelected : [styles.buttonHomeBottom, {backgroundColor: colors.background}]} onPress={() => {console.log('before set: ' + refresh); setShowCompleted(true); update(); setItems(items) ; console.log('after set: ' + refresh);}}>
                    <View style={{justifyContent: 'space-between', alignItems: 'center', padding: 7, marginRight:10}}>
                        <Icon name="check" size={25} color={showCompleted ? '#ffffff' : (isDark ? '#ffffff' : '#1c1b1b')}/>
                        <Text style={showCompleted ? styles.buttonTextSelected : [styles.buttonText, {color: colors.text}]}>{translations['completed']}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    containerLight: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    containerDark: {
        flex: 1,
        backgroundColor: '#1c1b1b',
    },
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
    buttonTextSelected: {
        color: 'white',
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
    // listItem: {
    //     // padding: 15,
    //     backgroundColor: '#ffffff',
    //     borderColor: '#b6b6b6',
    //     // borderWidth: 2,
    //     // borderRadius: 4,
    //     // marginVertical: 3,
    //     // marginHorizontal: 12,
    //     borderBottomWidth:1.2,
    // },
    btn: {
        backgroundColor: '#119ff7',
        marginBottom: 20,
        borderRadius: 100,
        // borderWidth:1,
        // borderColor:"blue",
        width: 60,
        height: 60,
        // alignSelf: "center",
        // justifyContent: "center",
        // position: "absolute",
        alignItems: 'center',
        justifyContent: 'center',
        top:0,
        bottom: 0,
        right: 0,
        left:0,

        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 4,
        // },
        // shadowOpacity: 0.32,
        // shadowRadius: 5.46,
        //
        elevation: 1,
    },
});

const stylesd = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2b2b2b',
    },
    buttonHomeBottom: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#2b2b2b',
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
        backgroundColor: '#2b2b2b',
        borderRadius: 8,
        borderWidth: 2,
        width: 150,
    },
    buttonText: {
        color: '#ffffff',
    },
    buttonTextSelected: {
        color: 'white',
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
        color:'#ffffff'
    },
    detailsText: {
        color: '#ffffff',
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
        color: '#ffffff'
    },
    settingText: {
        fontSize: 12,
    },
    // listItem: {
    //     // padding: 15,
    //     backgroundColor: '#ffffff',
    //     borderColor: '#b6b6b6',
    //     // borderWidth: 2,
    //     // borderRadius: 4,
    //     // marginVertical: 3,
    //     // marginHorizontal: 12,
    //     borderBottomWidth:1.2,
    // },
    btn: {
        backgroundColor: '#119ff7',
        marginBottom: 20,
        borderRadius: 100,
        // borderWidth:1,
        // borderColor:"blue",
        width: 70,
        height: 70,
        // alignSelf: "center",
        // justifyContent: "center",
        // position: "absolute",
        alignItems: 'center',
        justifyContent: 'center',
        top:0,
        bottom: 0,
        right: 0,
        left:0,

        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 4,
        // },
        // shadowOpacity: 0.32,
        // shadowRadius: 5.46,
        //
        elevation: 1,
    },
});
