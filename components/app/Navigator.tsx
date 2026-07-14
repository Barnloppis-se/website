"use client"
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import Image from "next/image";
import { createContext, ReactNode, useEffect, useState } from "react";

/**
 * Navigator context
 */
const context = createContext({
    state: "",
    navigate: (value: string) => {}
});

/**
 * Navigator props
 */
interface Props {
    /**
     * Application node
     *
     * All nodes and elements that
     * should be under guidance of
     * this navigator should be in
     * this property.
     */
    readonly children: ReactNode

    /**
     * Application routes
     *
     * These routes provides the navigator
     * with known locations. When a route
     * is added to this state the navigator
     * will mark it as `viewed` in the
     * navigation bar.
     */
    readonly routes?: { route: string, label: string }[]
}



/**
 * Application navigation provider
 */
export default function ApplicationNavigator(props: Props): ReactNode {
    const [ state, setState ] = useState("");

    useEffect(() => {
        setState(window.location.pathname);
    }, []);

    const setLocation = (url: string) => {
        window.location.href = url;
        setState(url);
    }

    return(
        <div className="size-full">
            <AppBar position="static">
                <Toolbar variant="dense">
                    <Image src={"/Logo - Barnloppis.png"} alt="Barnloppis Logo" loading="lazy" width={64} height={64} className="rounded-full mx-4 my-3" />
                    <Typography variant="h5" noWrap component="a" className="mr-4 font-mono text-inherit font-bold hover:cursor-pointer" sx={{ display: { xs: 'none', md: 'flex' }, letterSpacing: '.1rem', textDecoration: 'none' }} onClick={e => {
                            e.preventDefault();
                            setLocation("/");
                    }}>
                        Stor Barnloppis
                    </Typography>
                    {props.routes && <Box className="ml-10 grow sm:flex md:flex-none">
                        {props.routes.map(page => <Button key={page.route} disabled={state === page.route} onClick={e => {
                            e.preventDefault();
                            setLocation(page.route);
                        }}>
                            <Typography className={`text-center font-mono font-bold ${state === page.route ? "underline" : "text-blue-50"}`} color={state === page.route ? "textDisabled" : ""}>
                                {page.label}
                            </Typography>
                        </Button>)}
                    </Box>}
                </Toolbar>
            </AppBar>
            <context.Provider value={{ state, navigate: setLocation }}>
                {props.children}
            </context.Provider>
        </div>
    );
}
