"use client"
import { colors } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { ReactNode } from "react";
import DBContext from "../db/db";
import ApplicationNavigator from "./Navigator";

/**
 * Application theme
 */
export const theme = createTheme({
    palette: {
        background: {
            default: colors.common.white,
            paper: colors.blue[50]
        },
    }
});



/**
 * Application base component
 */
export default function Application({ children } : { children: ReactNode }): ReactNode {
    const theme = useTheme();

    return(
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={theme}>
                <ApplicationNavigator routes={[
                    { route: "/", label: "Hem" },
                    { route: "/items", label: "Bilder" }
                ]}>
                    <DBContext url={process.env.NEXT_PUBLIC_BACKEND}>
                        {children}
                    </DBContext>
                </ApplicationNavigator>
            </ThemeProvider>
        </AppRouterCacheProvider>
    );
}
