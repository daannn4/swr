import { ChangeEvent, memo } from "react";
import { TodoType } from "../../types/todo";
import { Checkbox, ListItem, ListItemText } from "@mui/material";
import { StyleType } from "../../types/styles";
import { serviceChangeTodo, serviceGetTodos } from "../services/todo";
import { mutate } from "swr";

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
    const changeCheckbox = async (_: ChangeEvent<HTMLInputElement>, checked: boolean) => {
        try {
            const updatedTodo = await serviceChangeTodo.callback({ isChecked: checked, name: name }, id); 
            mutate(serviceGetTodos.name, (todos: TodoType[] | undefined) => {
                if (!todos) return [];
                return todos.map(todo => todo.id === id ? updatedTodo : todo);
            }, false);
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    return (
        <ListItem sx={styles.item}>
            <Checkbox onChange={changeCheckbox} checked={isChecked} />
            <ListItemText primary={name} />
        </ListItem>
    )
})