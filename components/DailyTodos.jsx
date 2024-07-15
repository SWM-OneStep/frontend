import { DateContext } from "@/contexts/DateContext";
import { List } from "@ui-kitten/components";
import { useContext, useState } from "react";
import DailyTodo from "./DailyTodo";


const todosApi = 'http://ec2-54-180-249-86.ap-northeast-2.compute.amazonaws.com:8000/todos/';

const exampleData = [
    {
        id: 1,
        title: 'Do the laundry',
        isCompleted: true,
    },
    {   
        id: 2,
        title: 'Do the dishes',
        isCompleted: false,
    }
]

const DailyTodos = () => {

    const {date, setDate} = useContext(DateContext);
    const [todos, setTodos] = useState(exampleData);
    const renderTodo = ({item, index}) => {
        return <DailyTodo item={item} index={index} />
    }

    return (
        <List data={todos} renderItem={renderTodo} />
    )
}

export default DailyTodos;
