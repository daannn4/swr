import useSWR from "swr"
import { serviceGetTodos } from "../services/todo"
import { LayoutList } from "./LayoutList"
import { TodoType } from "../../types/todo"
import { Button, List } from "@mui/material"
import { Todo } from "./Todo"
import { TypicalError } from "../../types/error"
import { StyleType } from "../../types/styles"
import { useState } from "react"
import { GlobalContext } from "../../app/context/globalContext"
import { DrawerCreateTodo } from "./DrawerCreateTodo"

const styles: StyleType = {
    list: {
        height: 'calc(100vh - 200px)',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
}

export const Todos = () => {
    const {data, error, isLoading} = useSWR<TodoType[], TypicalError>(serviceGetTodos.name, serviceGetTodos.callback)
    const [isOpen, setIsOpen] = useState(false)

    const openDrawer = () => {
        setIsOpen(true)
    }

    const renderTodos = () => {
        return  (
            <List
                sx={styles.list}
            >
                {data?.map((todo) => (
                    <Todo
                        key={todo.id}
                        {...todo}
                    />
                ))}
            </List>
        )
    }

    return (
        <GlobalContext.Provider value={{
            isOpen,
            setIsOpen
        }}>
            <LayoutList
                renderData={renderTodos()}
                dataLength={data?.length}
                error={error}
                isLoading={isLoading}
            />
            <Button onClick={openDrawer}>Создать</Button>
            <DrawerCreateTodo /> 
        </GlobalContext.Provider>
    )
}