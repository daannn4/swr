export type TodoType = {
    id: string;
    name: string;
    isChecked: boolean;
};

export type ChangeTodoType = Omit<TodoType, 'id'>;

export type TodosType = TodoType[];

export type PartialTodoType = Partial<TodoType>;