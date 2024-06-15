import { instanceAxios } from "../../app/api/axios";
import { ServiceType } from "../../types/services";
import { ChangeTodoType, TodoType, TodosType } from "../../types/todo";

export const serviceGetTodos: ServiceType<TodosType, []> = {
    name: 'todos',
    callback: async function() {
        const response = await instanceAxios.get<TodosType>('todos');
        return response.data;
    },
};

export const serviceGetTodo: ServiceType<TodoType, [string]> = {
    name: 'todo',
    callback: async function(id: string) {
        const response = await instanceAxios.get<TodoType>(`todos/${id}`);
        return response.data;
    },
};

export const serviceCreateTodo: ServiceType<TodoType, [ChangeTodoType]> = {
    name: 'todos',
    callback: async function(todo: ChangeTodoType) {
        const response = await instanceAxios.post<TodoType>('todos', todo);
        return response.data;
    },
};

export const serviceChangeTodo: ServiceType<TodoType, [ChangeTodoType, string]> = {
    name: 'todos',
    callback: async function(todo: ChangeTodoType, id: string) {
        const response = await instanceAxios.put<TodoType>(`todos/${id}`, todo);
        return response.data;
    },
};