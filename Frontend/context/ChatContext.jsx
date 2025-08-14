import { Children, createContext } from "react";

export const ChatContext = createContext()

export const ChatProvider = ({children}) =>{
   
    const value ={

    }

    return (<ChatContext.Provider value={value}>
            
            {children}
    </ChatContext.Provider>)
}