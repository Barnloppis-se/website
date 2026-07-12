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
    const [ disabled, setDisabled ] = useState(false);

    useEffect(() => {
        setDisabled(preview.files.length === 0);
    }, [preview]);

    return(<Box className="m-1.5">
        <Button
            onClick={e => {
                e.preventDefault();
                if(props.ref?.current) props.ref?.current.reset();
            }}
            disabled={disabled}
            variant="outlined" color="error">Rensa</Button>
    </Box>);
}
