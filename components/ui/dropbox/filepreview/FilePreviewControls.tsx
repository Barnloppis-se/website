"use client"
import { Box, Button } from "@mui/material";
import { ReactNode, RefObject, useEffect, useState } from "react";
import FilePreview, { useFilePreview } from "./FilePreview";

/**
 * File preview controls properties
 */
export interface FilePreviewControlProps {
    /**
     * File preview instance
     */
    readonly ref?: RefObject<FilePreview | null>
}



/**
 * File preview controls component
 */
export default function FilePreviewControls(props: FilePreviewControlProps) : ReactNode {
    const preview = useFilePreview();
    const [ all, setAll ] = useState(false);
    const [ sel, setSel ] = useState(false);

    useEffect(() => {
        setAll(preview.files.length === 0);
        setSel(preview.selected.length === 0);
    }, [preview]);

    return(<Box className="m-1.5">
        <Button
            className="mr-2"
            onClick={e => {
                e.preventDefault();
                if(props.ref?.current) props.ref?.current.reset();
            }}
            disabled={all}
            variant="outlined" color="error">Rensa</Button>
        <Button
            className="ml-2"
            onClick={e => {
                e.preventDefault();
                if(props.ref?.current) props.ref.current.removeSelected();
            }}
            disabled={sel}
            variant="outlined" color="warning">Ta bort</Button>
    </Box>);
}
