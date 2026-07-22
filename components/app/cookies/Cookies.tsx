"use client"
import Popup from "@/components/ui/popup/Popup";
import { Box, Button, Modal, Typography } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { useNavigator } from "../Navigator";

/**
 * Application cookies manager
 */
export default function Cookies({ children } : { children?: ReactNode }): ReactNode {
    const navigator = useNavigator();
    const [ show, setShow ] = useState(false);

    useEffect(() => {
        const accepted = localStorage.getItem("accepted-cookies");
        setShow(accepted === "accept" ? false : true);
    }, []);

    return(
        <div className="size-full">
            {children}
            {show && <Box className="fixed bottom-0 top-auto bg-blue-50 w-full min-h-24 h-fit flex justify-center border-t-2 border-t-gray-100 border-solid">
                <div className="my-auto w-fit">
                    <Typography className="px-8 my-12 m-auto text-gray-700">
                        Accepterar du att <span className="font-bold font-mono">inga</span> cookies samlas in?
                        <br/>
                        För mer information se <span className="bg-blue-100 rounded-sm underline hover:cursor-pointer px-2" style={{ paddingTop: "1px", paddingBottom: "1px" }} onClick={e => {
                            e.preventDefault();
                            navigator.navigate("/policy");
                        }}>Användar Policy</span>
                    </Typography>
                </div>
                <div className="my-auto">
                    <Button className="mb-4 md:mb-0 md:min-w-36 mx-5" variant="outlined" color="error" onClick={e => {
                        e.preventDefault();
                        setShow(false);
                    }}>Neka</Button>
                    <Button className="md:min-w-36 mx-5" variant="outlined" color="primary" onClick={e => {
                        e.preventDefault();
                        localStorage.setItem("accepted-cookies", "accept");
                        setShow(false);
                    }}>Acceptera</Button>
                </div>
            </Box>}
        </div>
    );
}
