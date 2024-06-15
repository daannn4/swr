import { createContext } from "react";

type GlobalContextType = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const GlobalContext = createContext<GlobalContextType>({
    isOpen: false,
    setIsOpen: () => undefined
})