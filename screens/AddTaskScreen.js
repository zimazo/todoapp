import AddItem from "../components/AddItem";
import React from "react";

export function AddTaskScreen({ navigation, route }) {
    const { addItem} = route.params;
    return(
        <AddItem addItem={addItem} navigation={navigation}/>
    )
}
