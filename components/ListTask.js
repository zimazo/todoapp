import React, {useContext} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity, Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {LocalizationContext} from "./Translations";
import {enUS, sk} from "date-fns/esm/locale";
import {format, fromUnixTime} from "date-fns";

const ListTask = ({item, deleteItem, switchCompleted, showCompleted, update, navigation}) => {
    const {translations, initializeAppLanguage} = useContext(LocalizationContext);
    initializeAppLanguage();

    const getLocale = () => {
        return translations.getLanguage() === 'en' ? enUS : sk
    };

    const getFormat = () => {
        return translations.getLanguage() === 'en' ? 'EEE MMM d HH:mm yyyy' : 'EEE d. M. HH:mm yyyy'
    };

    return (
        // <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('Details', {
        //     id: item.id
        // })}>
        <View style={styles.container}>
            <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('Details', {
                item: item,
                deleteItem: deleteItem,
                switchCompleted: switchCompleted,
                update: update,
            })}>
                <View>
                    <View style={{backgroundColor: 'white'}}>
                        <View style={styles.listItemViewRow}>
                            <Text style={styles.listItemText}>{item.text}</Text>
                            {/*{showCompleted ? <Icon name ="remove" size ={20} color="red" onPress={() => deleteItem(item.id)}/> : <Icon name ="check" size ={20} color="#119ff7" onPress={() => markAsDone(item)}/>}*/}
                            {/*<Icon name ="remove" size ={20} color="red" onPress={() => deleteItem(item.id)}/>*/}
                            {/*<Icon name ="check" size ={20} color="blue" onPress={() => markAsDone(item)}/>*/}
                        </View>
                        <View style={styles.listItemView}>
                            {/*<Text style={styles.listItemDate}>Added: {item.dateAdded}</Text>*/}
                            {/*<Text style={styles.listItemDate}>{translations['listTaskDateEnd']} {format(item.dateEnd, 'EEE MMM d HH:mm yyyy')}</Text>*/}
                            <Text style={styles.listItemDate}>{translations['listTaskDateEnd']} {format(fromUnixTime(item.dateEnd), getFormat(), {locale: getLocale()})}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => switchCompleted(item)}>
                <View style={{flex:3, backgroundColor: 'white', justifyContent:"center", alignItems:"center", borderBottomWidth:1, borderColor: '#b6b6b6',}}>
                        <View style={{paddingVertical:10, paddingHorizontal:13, borderLeftWidth:1, borderColor: '#b6b6b6'}}>
                            {showCompleted ? <Icon name ="remove" size ={25} color="red" onPress={() => deleteItem(item.id)}/> : <Icon name ="check" size ={25} color="#119ff7" />}
                        </View>
                </View>
            </TouchableOpacity>
        </View>
        // <View style={{flex:1, backgroundColor: 'white', flexDirection:'row', padding:12}}>
        //     <View style={styles.listItemViewRow}>
        //         <Text style={styles.listItemText}>{item.text}</Text>
        //         {/*{showCompleted ? <Icon name ="remove" size ={20} color="red" onPress={() => deleteItem(item.id)}/> : <Icon name ="check" size ={20} color="#119ff7" onPress={() => markAsDone(item)}/>}*/}
        //         {/*<Icon name ="remove" size ={20} color="red" onPress={() => deleteItem(item.id)}/>*/}
        //         {/*<Icon name ="check" size ={20} color="blue" onPress={() => markAsDone(item)}/>*/}
        //     </View>
        //     <View style={styles.listItemView}>
        //         {/*<Text style={styles.listItemDate}>Added: {item.dateAdded}</Text>*/}
        //         {/*<Text style={styles.listItemDate}>{translations['listTaskDateEnd']} {format(item.dateEnd, 'EEE MMM d HH:mm yyyy')}</Text>*/}
        //         <Text style={styles.listItemDate}>{translations['listTaskDateEnd']} {format(fromUnixTime(item.dateEnd), getFormat(), {locale: getLocale()})}</Text>
        //     </View>
        //     <View style={{flex:1, backgroundColor: 'white', justifyContent:"center", alignItems:"center", borderLeftWidth:0.5}}>
        //         <TouchableOpacity onPress={() => markAsDone(item)}>
        //             {showCompleted ? <Icon name ="remove" size ={25} color="red" onPress={() => deleteItem(item.id)}/> : <Icon name ="check" size ={25} color="#119ff7" />}
        //         </TouchableOpacity>
        //     </View>
        // </View>




        // </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    // listItem: {
    //     padding: 15,
    //     backgroundColor: '#f8f8f8',
    //     borderBottomWidth: 1,
    //     borderColor: '#eee',
    // },
    container: {
        flex: 1,
        // backgroundColor: 'lightgreen',
        flexDirection:"row",
        justifyContent: "space-between",
        // padding: 15,
    },
    listItem: {
        padding:13.27,
        flex:20,
        // padding: 15,
        // backgroundColor: 'green',
        borderColor: '#b6b6b6',
        // borderWidth: 2,
        // borderRadius: 4,
        // marginVertical: 3,
        // marginHorizontal: 12,
        borderBottomWidth:1.2,
    },
    listItemViewRow: {
        // flex:5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    listItemView: {
        // flex:5,
        // alignItems: 'flex-end',
        // backgroundColor:"lightgreen",
        // marginLeft:('40%'),
    },
    listItemText: {
        fontSize: 18,
        color:'black'
    },
    listItemDate: {
        fontSize: 12,
        textAlign: "left",
        // alignSelf: 'baseline',
        color: '#119ff7',
        fontFamily:'sans-serif'
    },
    checkedItemText: {
        fontSize: 18,
        textDecorationLine: 'line-through',
        color: 'green',
    },
    iconView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: 70,
    },
    editItemInput: {
        padding: 0,
        fontSize: 18,
    },
});

export default ListTask;
