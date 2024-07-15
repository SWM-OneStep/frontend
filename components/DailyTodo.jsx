import AsyncStorage from "@react-native-async-storage/async-storage";
import { Icon, List, ListItem, useTheme } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";


const DailyTodo = ({item, index}) => {
    const [completed, setCompleted] = useState(item.isCompleted);
    const theme = useTheme();

    const checkIcon = (props) => {
        return (
            <TouchableOpacity onPress={() => handleCheck()}>
            {completed ? (
                <Icon {...props} name='checkmark-circle-2-outline' fill={theme['color-primary-500']} />
            ) : (
                <Icon {...props} name='checkmark-circle-2-outline' theme={theme['text-basic-color']} />
            )}
        </TouchableOpacity>
        );
    };

    const settingIcon = (props) => {
        return (
            <TouchableOpacity>
                <Icon name="star" />
            </TouchableOpacity>
        )
    }
    
    const handleCheck = () => {
        setCompleted(!completed);
        // API 요청 보내서 todo 상태 변화시키기
    }

    return (
        <ListItem title={item.content} key={index} accessoryLeft={(props) => checkIcon(props)} accessoryRight={(props) => settingIcon(props)} />
    )

    // const fetchTodos = async () => {
    //     const userId = await AsyncStorage.getItem('userId');
    //     const accessToken = await AsyncStorage.getItem('accessToken');
    //     const response = await fetch(`${todos}?user_id=${userId}`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${accessToken}`,
    //         },
    //     });
    //     if(response.error) {
    //         return
    //     }
    //     const responseData = await response.json();
    //     setTodos(responseData);
    
}

const styles = StyleSheet.create({
    icon_checked: {
        color: 'green',
    },
    icon_unchecked: {
        color: 'gray',
    }
})

export default DailyTodo;