import AsyncStorage from "@react-native-async-storage/async-storage";
import { Icon, List, ListItem } from "@ui-kitten/components";
import { useEffect, useState } from "react";

const checkIcon = (props) => (
    <Icon {...props} name='checkmark-circle-2-outline'/>
);

const todosApi = 'http://ec2-54-180-249-86.ap-northeast-2.compute.amazonaws.com:8000/todos/';

const DailyTodo = () => {
    const [todos, setTodos] = useState([]);
    const renderTodos = ({item, index}) => {
        return <ListItem title={item.title} key={index} accessoryLeft={checkIcon} />
    }

    return (
        <List data={todos} renderItem={renderTodos} />
    );

    const fetchTodos = async () => {
        const userId = await AsyncStorage.getItem('userId');
        const accessToken = await AsyncStorage.getItem('accessToken');
        const response = await fetch(`${todos}?user_id=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        if(response.error) {
            return
        }
        const responseData = await response.json();
        setTodos(responseData);
    }

    useEffect(() => {
        fetchTodos();
    })
}

export default DailyTodo;