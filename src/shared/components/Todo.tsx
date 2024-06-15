import { ChangeEvent, memo, useState } from "react";
import { TodoType } from "../../types/todo";
import { Checkbox, ListItem, ListItemText } from "@mui/material";
import { StyleType } from "../../types/styles";
import { serviceChangeTodo } from "../services/todo";
import { mutate } from "swr";
import { Link } from "react-router-dom";

const styles: StyleType = {
    item: {
        textAlign: 'center',
        display: 'flex',
        width: 'fit-content'
    },
}

export const Todo = memo(({
    isChecked,
    name,
    id
}: TodoType) => {
    const [isLoading, setIsLoading] = useState(false)

    const changeCheckbox = async (_: ChangeEvent<HTMLInputElement>, checked: boolean) => {
        try {
            setIsLoading(true)
            const updatedTodo = await serviceChangeTodo.callback({ isChecked: checked, name: name }, id); 
            mutate(serviceChangeTodo.name, (todos: TodoType[] | undefined) => {
                if (!todos) return [];
                return todos.map(todo => todo.id === id ? updatedTodo : todo);
            }, false);
        } catch (error) {
            console.error('Error updating todo:', error);
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <ListItem sx={styles.item}>
            <Checkbox onChange={changeCheckbox} checked={isChecked} disabled={isLoading} />
            {!isLoading 
            ? (
                <Link to={`/todo/${id}`}>
                    <ListItemText primary={name} />
                </Link>
            ) 
            : (
                <div>Загрузка...</div>
            )
            }
        </ListItem>
    )
})