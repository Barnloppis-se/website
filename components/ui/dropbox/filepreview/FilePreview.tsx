import { Box, ImageList, ImageListItem } from "@mui/material";
import { Component, ContextType, createContext, ReactNode, RefAttributes, useContext } from "react";
import FilePreviewControls, { FilePreviewControlProps } from "./FilePreviewControls";
import Dropbox, { DropboxProps } from "../Dropbox";

/**
 * File preview properties
 */
interface Props extends RefAttributes<FilePreview> {
    /**
     * Child components
     *
     * This could include a `Dropbox`
     * for file input usage.
     */
    readonly children: ReactNode
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
     * File preview controls component
     *
     * This can be used to assign global
     * controls to the file preview component.
     */
    declare static Controls: (props: FilePreviewControlProps) => ReactNode;

    /**
     * Dropbox component
     *
     * This can be used to upload and
     * select files for a `FilePreview`
     * state instance.
     */
    declare static Dropbox: (props: DropboxProps) => ReactNode;



    static contextType = createContext<FilePreview>(new FilePreview({children: null}));

    /**
     * File preview state
     */
    state: Readonly<State> = {
        files: []
    }



    render = () => (<Box>
        <FilePreview.contextType.Provider value={this}>
            <Box className="w-full h-fit">{this.props.children}</Box>
            <ImageList>
                {this.state.files.map(file => <ImageListItem key={file.webkitRelativePath}>
                    <img src={file} alt={file.name} loading="lazy" />
                </ImageListItem>)}
            </ImageList>
        </FilePreview.contextType.Provider>
    </Box>)



    /**
     * Adds `files` to state and calls `done` when the
     * process is finished.
     *
     * @param files Files to add to state
     * @param done Callback for operation finished event
     */
    public add = (files: File[], done?: (files: File[]) => void) => {
        this.setState(prev => ({
            files: [...prev.files, ...files]
        }), () => {if(done) done(this.state.files)});
    }

    /**
     * Removes `file` from state and calls `done`
     * when the operation is finished.
     *
     * @param file File to remove
     * @param done Callback for operation finished event
     */
    public remove = (file: File, done?: (files: File[]) => void) => {
        this.setState(prev => ({
            files: prev.files.toSpliced(prev.files.indexOf(file), 1)
        }), () => {if(done) done(this.state.files)});
    }

    /**
     * Resets file preview
     *
     * This will remove all uploaded files
     * selected and call the callback when
     * the operation has finished its task
     *
     * @param done Callback
     */
    public reset = (done?: (files: File[]) => void) => {
        this.setState(prev => ({
            files: []
        }), () => {if(done) done(this.state.files)});
    }
}



/**
 * Gets the local file preview context
 *
 * @returns File preview context
 */
export const useFilePreview = () => useContext(FilePreview.contextType);



FilePreview.Controls = FilePreviewControls;
FilePreview.Dropbox = Dropbox;
