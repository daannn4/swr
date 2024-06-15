import { ReactNode } from "react";

interface LayoutListProps<T> {
    isLoading: boolean;
    error?: T;
    renderData: ReactNode;
    dataLength?: number;
}

export const LayoutList = <T extends Record<string, unknown>>({
    isLoading,
    error,
    renderData,
    dataLength
}: LayoutListProps<T>) => {
    if(isLoading) {
        return <>Загрузка...</>
    }

    if(error) {
        return <>Ошибка: {error?.message || 'неизвестная'}</>
    }

    if(!dataLength) {
        return <>Данных нет</>
    }

    return renderData
}