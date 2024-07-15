import { DateContext } from "@/contexts/DateContext";
import { List, Input, Layout, Button, Icon } from "@ui-kitten/components";
import { useContext, useState, useEffect } from "react";
import DailyTodo from "./DailyTodo";


const todosApi = 'http://ec2-54-180-249-86.ap-northeast-2.compute.amazonaws.com:8000/todos/';

// const todosApi = 'http://10.0.2.2:8000/todos/';

const exampleData = []

const DailyTodos = () => {

    useEffect(() => {
        const fetchTodos = async () => {
            const response = await fetch(`${todosApi}?user_id=1`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const responseData = await response.json();
            setTodos(responseData);
        }
        fetchTodos();
    }, []);

    const {date, setDate} = useContext(DateContext);
    const [todos, setTodos] = useState(exampleData);
    const [input, setInput] = useState('');
    const renderTodo = ({item, index}) => {
        return <DailyTodo item={item} index={index} />
    }
    const handleSubmit = async () => {
        const newTodoId = await todoUpdate(input);
        setTodos([...todos, {id: newTodoId, content: input}])
        setInput('');
    }

    const todoUpdate = async (content) => {
        const date = new Date().toISOString().split('T')[0]
        const response = await fetch(todosApi, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: "1",
                start_date: date,
                deadline: null,
                content: content,
                category: "#FFFFFF",
                parent_id: null
            })
        })
        const responseData = await response.json();
        return responseData.id;
    }

    return (
        <Layout>
            <List data={todos} renderItem={renderTodo} />
            <Input
                placeholder='Place your Text'
                value={input}
                onChangeText={nextInput => setInput(nextInput)}
                onSubmitEditing={handleSubmit}
                />
        </Layout>
    )
}

export default DailyTodos;
