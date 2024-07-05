"use client"

import config from "@/config.json";
import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { createContext, useContext } from "react";
import { createTheme } from "@mui/material/styles";

export const PekillaContext = createContext({
    userId: config.id
});

export function PekillaContextProvider(props: { children: any }) {
    // It is a listener, when the browser change, the site change.
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)', { 
        // Give the defaultValues.
        defaultMatches : window.matchMedia('(prefers-color-scheme: dark)').matches,
        // To do not rerender after the first mount
        noSsr : true
    });

    const theme = createTheme({
        palette: {
            mode: prefersDarkMode ? "dark" : "light",
        },
        components: {
            MuiTextField: {
                defaultProps: {
                    variant: "outlined"
                }
            }
        }
    });

    return (
        <PekillaContext.Provider value={{ userId: config.id }}>
            <ThemeProvider theme={theme}>
                <CssBaseline enableColorScheme />
                {props.children}
            </ThemeProvider>
        </PekillaContext.Provider>
    )
}

export function usePekillaContext() {
    return useContext(PekillaContext);
}