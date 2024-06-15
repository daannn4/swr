import { Button, Drawer, TextField } from "@mui/material"
import { useContext, useState } from "react"
import { GlobalContext } from "../../app/context/globalContext"
import { serviceCreateTodo } from "../services/todo";
import { TodoType } from "../../types/todo";
import { mutate } from "swr";

export const DrawerCreateTodo = () => {
    const [title, setTitle] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const {isOpen, setIsOpen} = useContext(GlobalContext);

    const handleCreateTodo = async () => {
        try {
            setIsLoading(true)
            const newTodo = await serviceCreateTodo.callback({
                isChecked: false,
                name: title
            }); 
            mutate(serviceCreateTodo.name, (todos: TodoType[] | undefined) => (todos?.length ? [...todos, newTodo] : [newTodo]), false);
            setTitle('')
            setIsOpen(false)
        } catch (error) {
            console.error('Error updating todo:', error);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Drawer
            anchor="right"
            open={isOpen}
            onClose={() => setIsOpen(false)}
        >
            <div style={{ width: 250, padding: 16 }}>
                <h2>Create Todo</h2>
                <TextField
                    label="Title"
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    margin="normal"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCreateTodo}
                    disabled={!title.trim() || isLoading}
                >
                    Create
                </Button>
            </div>
        </Drawer>
    )
}