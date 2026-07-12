import { Box, Button } from "@mui/material";
import { ReactNode } from "react";
import { useFilePreview } from "./FilePreview";

/**
 * File preview controls properties
 */
export interface FilePreviewControlProps {
}



/**
 * File preview controls component
 */
export default function FilePreviewControls(props: FilePreviewControlProps) : ReactNode {
    const preview = useFilePreview();

    return(<Box>
        <Button
            onClick={e => {
                e.preventDefault();
                preview.reset();
            }}
            disabled={preview.state.files.length == 0}
            variant="outlined" color="error">Rensa</Button>
    </Box>);
}
