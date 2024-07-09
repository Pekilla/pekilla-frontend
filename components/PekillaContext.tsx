"use client";

import "@fontsource/space-grotesk"; // Defaults to weight 400
import "@fontsource/space-grotesk/400.css"; // Specify weight


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
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: light)');

    const theme = createTheme({
        typography: {
            fontFamily: [
                'Space Grotesk'
            ].join(','),
        },
        palette: {
            mode: prefersDarkMode ? "dark" : "light",
            primary: {
                main: '#ff4081',
                dark: '#d81b60',
                light: '#000000'
            },
            secondary: {
                main: '#000000',
                dark: '#000000',
                light: '#ffffff'
            },
        },
        components: {
            MuiInputBase: {
                defaultProps: {
                    sx: {
                        borderRadius: 2
                    }
                }
            },
            MuiTextField: {
                defaultProps: {
                    variant: "outlined"
                }
            },
            MuiLink : {
                defaultProps : {
                    color: "inherit",
                    underline : "hover"
                }
            },
            MuiButton : {
                defaultProps : {
                    variant : "contained",
                    sx: {
                        fontWeight: 700,
                        textTransform: "none",
                        boxShadow: "none",
                    }
                }
            },
            MuiButtonBase: {
                defaultProps : {
                    disableRipple: true
                }
            },
            MuiAvatar : {
                defaultProps : {
                    sx : {
                        borderRadius : 2
                    },
                    variant: "square"
                }
            },
            MuiCard : {
                defaultProps : {
                    variant: "outlined",
                    sx: {
                        borderRadius: 4
                    }
                }
            },
            MuiSelect : {
                defaultProps : {
                    MenuProps: {
                        slotProps: {
                            paper: {
                                elevation : 0,
                                variant : "outlined",
                                sx: {
                                    borderRadius : "12px"
                                }
                            }
                        }
                    }
                }
            },
            MuiChip : {
                defaultProps : {
                    sx : {
                        fontWeight: 500,
                    }
                }
            },
            MuiDialog : {
                defaultProps : {
                    PaperProps : {
                        elevation : 0,
                        variant : "outlined"
                    }
                }
            },
            MuiCircularProgress : {
                defaultProps : {
                    color: 'primary'
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