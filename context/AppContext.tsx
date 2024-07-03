"use client"

import { createContext, ReactElement, ReactNode } from "react";
import config from "@/config.json";

export const PekillaContext = createContext({
    userId: config.id,
});

export function AppContextProvider(props: {children: any}) {
    return (
        <PekillaContext.Provider value={{userId: config.id}}>
            {props.children}
        </PekillaContext.Provider>
    )
}