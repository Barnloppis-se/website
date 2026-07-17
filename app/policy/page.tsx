"use client"
import { Box } from "@mui/material";
import MuiMarkdown from "mui-markdown";
import { ReactNode, useEffect, useState } from "react";

/**
 * Policy page
 */
export default function Policy(): ReactNode {
    const [ markdown, set ] = useState("");

    useEffect(() => {
        (async () => {
            const res = await fetch("/policy/policy.md");
            const raw = await res.text();
            set(raw);
        })();
    }, []);

    return(
        <Box className="m-12">
            <MuiMarkdown>{markdown}</MuiMarkdown>
        </Box>
    );
}
