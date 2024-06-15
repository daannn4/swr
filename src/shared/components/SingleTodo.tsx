import { Link, useParams } from "react-router-dom";
import useSWR from "swr";
import { serviceGetTodo } from "../services/todo";
import { TodoType } from "../../types/todo";

export const SingleTodo = () => {
    const { id } = useParams<{id: string}>();
    const resultId = id || 'unknown'

    const {data, error, isLoading} = useSWR<TodoType>(`${serviceGetTodo.name}_${id}`, () => serviceGetTodo.callback(resultId))

    if(isLoading) {
        return <div>Загрузка...</div>
    }

    if(error) {
        return <div>Ошибка</div>
    }

    if(!data) {
        return <div>Элемент не найден</div>
    }

    return (
        <div>
            <Link to="/">main</Link>
            <div>{data.id} - {data.name}</div>
            <div>{data.isChecked ? 'Выполнено' : 'Не выполнено'}</div>
        </div>
    )
}