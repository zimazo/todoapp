import React, {useContext, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import DatePicker from "react-native-date-picker";
import {LocalizationContext} from "./Translations";

const AddItem = ({navigation, addItem}) => {
    const {translations, initializeAppLanguage} = useContext(LocalizationContext);
    initializeAppLanguage();

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

    return (
        <View>
            <Text style={styles.title}>{translations['addTaskTextTitle']}</Text>
            <TextInput
                placeholder={translations['addTaskTextPlaceholder']}
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
            <Text style={styles.title}>{translations['addTaskDateDueTitle']}</Text>
            <View style={styles.listItemView}>
                <TouchableOpacity onPress={() => setOpen(true)} >
                    <TextInput style={styles.input} editable={false}>
                        {checkDate(dateEnd) ? dateEnd.toLocaleString() : 'Select a date'}
                    </TextInput>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setOpen(true)} >
                    <Icon name="calendar" size={25} color={'#119ff7'}/>
                </TouchableOpacity>
            </View>
            {/*</TouchableOpacity>*/}
            <DatePicker
                modal
                open={open}
                date={dateEnd}
                onConfirm={(dateEnd) => {
                    setOpen(false)
                    setDateEnd(dateEnd)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
            <Text style={styles.title}>{translations['addTaskDetailTitle']}</Text>
            <TextInput
                placeholder={translations['addTaskDetailPlaceholder']}
                maxLength={80}
                style={styles.input}
                onChangeText={onChangeDetails}
                value={details}
            />
            <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                    if (!text.trim()) {
                        alert('Please enter a title');
                        return;
                    }
                    addItem(text, dateAdded.toLocaleString(), dateEnd.toLocaleString(), details);
                    setText('');
                    setDateEnd('');
                    navigation.goBack();
                }}>
                <Text style={styles.btnText}>
                    <Icon name="plus" size={20} /> {translations['addTaskButton']}
                </Text>
            </TouchableOpacity>
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
        color: 'black'
    },
    btn: {
        backgroundColor: 'white',
        padding: 9,
        margin: 5,
    },
    btnText: {
        color: '#119ff7',
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
});

export default AddItem;
