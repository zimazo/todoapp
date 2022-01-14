import React, {useContext} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity, Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {LocalizationContext} from "./Translations";

const ListTask = ({item, deleteItem, markAsDone, showCompleted, update}) => {
    const {translations, initializeAppLanguage} = useContext(LocalizationContext);
    initializeAppLanguage();

    return (
        // <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('Details', {
        //     id: item.id
        // })}>
        <View >
            <View style={styles.listItemViewRow}>
                <Text style={styles.listItemText}>{item.text}</Text>
                {showCompleted ? <Icon name ="remove" size ={20} color="red" onPress={() => deleteItem(item.id)}/> : <Icon name ="check" size ={20} color="blue" onPress={() => markAsDone(item)}/>}
                {/*<Icon name ="remove" size ={20} color="red" onPress={() => deleteItem(item.id)}/>*/}
                {/*<Icon name ="check" size ={20} color="blue" onPress={() => markAsDone(item)}/>*/}
            </View>
            <View style={styles.listItemView}>
                {/*<Text style={styles.listItemDate}>Added: {item.dateAdded}</Text>*/}
                <Text style={styles.listItemDate}>{translations['listTaskDateEnd']} {item.dateEnd}</Text>
            </View>
        </View>
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
    listItemViewRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    listItemView: {
        alignItems: 'flex-end',
    },
    listItemText: {
        fontSize: 18,
        color:'black'
    },
    listItemDate: {
        fontSize: 11,
        // textAlign: "right",
        alignSelf: 'flex-end',
        color: '#565656'
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
