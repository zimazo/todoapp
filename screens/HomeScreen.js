import React, {useContext, useEffect, useState} from "react";
import {LocalizationContext} from "../components/Translations";
import {ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import firestore from "@react-native-firebase/firestore";
import ListTask from "../components/ListTask";

export function HomeScreen({ navigation }) {
    const {translations, initializeAppLanguage} = useContext(LocalizationContext);
    initializeAppLanguage();

    // const [items, setItems] = useState([
    //     {
    //         id: uuid.v4(),
    //         completed: false,
    //         text: 'Clean the house',
    //         dateAdded: new Date().toLocaleString(),
    //         dateEnd: new Date().toLocaleString(),
    //         details: 'I really should do some cleaning around here',
    //         image: null
    //     },
    //     {
    //         id: uuid.v4(),
    //         completed: false,
    //         text: 'Wash the dishes',
    //         dateAdded: new Date().toLocaleString(),
    //         dateEnd: new Date().toLocaleString(),
    //         details: 'They have been piling up for a week now',
    //         image: null
    //     },
    //     {
    //         id: uuid.v4(),
    //         completed: false,
    //         text: 'Bake cookies',
    //         dateAdded: new Date().toLocaleString(),
    //         dateEnd: new Date().toLocaleString(),
    //         details: 'I love cookies',
    //         image: null
    //     },
    //     {
    //         id: uuid.v4(),
    //         completed: false,
    //         text: 'Play videogames',
    //         dateAdded: new Date().toLocaleString(),
    //         dateEnd: new Date().toLocaleString(),
    //         details: 'Time to chill',
    //         image: null
    //     },
    //     {
    //         id: uuid.v4(),
    //         completed: true,
    //         text: 'Watch Tv',
    //         dateAdded: new Date().toLocaleString(),
    //         dateEnd: new Date().toLocaleString(),
    //         details: '',
    //         image: null
    //     },
    // ]);
    const [items, setItems] = useState([]);
    const [showCompleted, setShowCompleted] = useState(true);
    const [refresh, setRefresh] = useState(true);
    // let showCompleted = false

    const update = () => {
        setRefresh(!refresh)
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{flexDirection:"row" }}>
                    <TouchableOpacity onPress={() => deleteAllCompletedAlert()}>
                        <View style={{ alignItems: 'center', padding: 7, marginRight:5}}>
                            <Icon name="trash" size={25} color='#f4511e'/>
                        </View>
                    </TouchableOpacity>
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
        <View style={styles.container}>
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
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => navigation.navigate('AddTask')}>
                        <Icon style={{color: "white"}} name="plus" size={32} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flex: 1, flexDirection: "row", justifyContent: "space-evenly"}}>
                <TouchableOpacity style={showCompleted ? styles.buttonHomeBottom : styles.buttonHomeBottomSelected} onPress={() => {console.log('before set: ' + refresh); setShowCompleted(false); update(); setItems(items) ; console.log('after set: ' + refresh);}}>
                    <View style={{justifyContent: 'space-between', alignItems: 'center', padding: 7, marginRight:10}}>
                        <Icon name="list" size={25} color={showCompleted ? 'black' : 'white'}/>
                        <Text style={showCompleted ? styles.buttonText : styles.buttonTextSelected}>{translations['toDo']}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={showCompleted ? styles.buttonHomeBottomSelected : styles.buttonHomeBottom} onPress={() => {console.log('before set: ' + refresh); setShowCompleted(true); update(); setItems(items) ; console.log('after set: ' + refresh);}}>
                    <View style={{justifyContent: 'space-between', alignItems: 'center', padding: 7, marginRight:10}}>
                        <Icon name="check" size={25} color={showCompleted ? 'white' : 'black'}/>
                        <Text style={showCompleted ? styles.buttonTextSelected : styles.buttonText}>{translations['completed']}</Text>
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
