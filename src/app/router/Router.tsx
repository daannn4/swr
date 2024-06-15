import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Todos } from "../../shared/components/Todos"
import { SingleTodo } from "../../shared/components/SingleTodo"

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" Component={Todos} />
                <Route path="/todo/:id" Component={SingleTodo} />
            </Routes>
        </BrowserRouter>
    )
}