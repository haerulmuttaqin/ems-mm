import React, {createContext, useReducer} from "react";
import Reducer from './Reducer'


const initialState = {
    refTypeSelected: null,
    refGenericSelected: null,
    menuItemSelected: null,
    menuSelected: null,
    moduleSelected: null,
    moduleNameSelected: null,
    moduleActionSelected: null,
    currentMenuName: "Base App",
};

const Store = ({children}) => {
    const [state, dispatch] : any = useReducer(Reducer, initialState);
    return (
        <Context.Provider value={[state, dispatch] as any}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(initialState);
export default Store;