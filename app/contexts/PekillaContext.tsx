"use client"

import config from "@/config.json";
import { createContext, useContext } from "react";

export const PekillaContext = createContext({
    userId: config.id,
});

export function PekillaContextProvider(props: {children: any}) {
    return (
        <PekillaContext.Provider value={{userId: config.id}}>
            {props.children}
        </PekillaContext.Provider>
    )
}

export function usePekillaContext() {
    return useContext(PekillaContext);
}