"use client"

import config from "@/config.json";
import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { createContext, useContext } from "react";

export const PekillaContext = createContext({
    userId: config.id
});

/**
 const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)', { 
    // Give the defaultValues.
    defaultMatches : window.matchMedia('(prefers-color-scheme: dark)').matches,
    // To do not rerender after the first mount
    noSsr : true
});
 */

export function PekillaContextProvider(props: { children: any }) {
    // It is a listener, when the browser change, the site change.
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

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