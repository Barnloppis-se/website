import { Box } from "@mui/material";
import { Component } from "react";

/**
 * File preview properties
 */
interface Props {
}

/**
 * File preview state
 */
interface State {
    /**
     * List of files
     */
    readonly files: File[]
}



/**
 * File preview component
 *
 * Allows for file preview and management
 * over files from the `Dropbox` component.
 */
export default class FilePreview extends Component<Props, State> {
    /**
     * File preview state
     */
    state: Readonly<State> = {
        files: []
    }



    render = () => (<Box>
    </Box>)
}
