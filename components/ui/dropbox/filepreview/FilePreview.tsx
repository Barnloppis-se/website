import { Box, Button, Grid } from "@mui/material";
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

    /**
     * State change event callback
     *
     * This is called when the
     * state changes.
     *
     * If the file preview is updated
     * (files added, removed or reset)
     * then this is called with.
     * The `files` parameter is the new
     * state file list.
     *
     * @param files List of files
     */
    readonly onChange?: (files: File[]) => void;
}

/**
 * File preview state
 */
interface State {
    /**
     * List of files
     */
    readonly files: File[]

    /**
     * File object hovering status
     */
    readonly selected: File[]
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



    static contextType = createContext<State>({ files: [], selected: [] });
    context!: ContextType<typeof FilePreview.contextType>;

    /**
     * File preview state
     */
    state: Readonly<State> = {
        files: [],
        selected: [],
    }



    render = () => (<Box>
        <FilePreview.contextType.Provider value={this.state}>
            <Box className="w-full h-fit">{this.props.children}</Box>
            <Box className="flex w-full h-fit pt-3">

                <Grid container columns={{ sm: 4, md: 12 }} rowSpacing={1} columnSpacing={2}>
                    {this.state.files.map(file => <Grid key={this.state.files.indexOf(file)} size={{ sm: 2, md: 4 }}>
                        <Button onClick={e => {
                            e.preventDefault();
                            this.select(file);
                        }}>
                            <div className={`${this.isSelected(file) ? "border-8 border-solid border-blue-100" : ""}`}>
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt={`${file.webkitRelativePath}/${file.name}`}
                                    loading="lazy"
                                    className="size-full rounded-xs"
                                />
                            </div>
                        </Button>
                    </Grid>)}
                </Grid>
            </Box>
        </FilePreview.contextType.Provider>
    </Box>);



    /**
     * Marks or un-marks file from selections
     *
     * If the file is selected then this
     * will unselect that file else this
     * will select the file.
     *
     * @param file File to select
     */
    public select = (file: File) => {
        const selected = this.state.selected;
        if(this.isSelected(file)) selected.splice(selected.indexOf(file), 1);
        else selected.push(file);

        this.setState(prev => ({
            files: prev.files,
            selected: selected
        }), this.OnChange);
    }

    /**
     * Checks if file is currently being selected
     *
     * @param file File to check
     * @returns Status of file selection
     */
    public isSelected = (file: File) => this.state.selected.indexOf(file) !== -1;

    /**
     * Removes all the selected files
     * from this state.
     */
    public removeSelected = () => {
        const files =  this.state.files;
        for(const file of this.state.selected) {
            files.splice(files.indexOf(file), 1);
        }

        this.setState(({
            files: files,
            selected: []
        }), this.OnChange);
    }

    /**
     * Adds `files` to state and calls `onChange` when the
     * process is finished.
     *
     * @param files Files to add to state
     */
    public add = (files: File[]) => {
        this.setState(prev => ({
            files: [...prev.files, ...files],
            selected: [],
        }), this.OnChange);
    }

    /**
     * Removes `file` from state and calls `onChange`
     * when the operation is finished.
     *
     * @param file File to remove
     */
    public remove = (file: File) => {
        this.setState(prev => ({
            files: prev.files.toSpliced(prev.files.indexOf(file), 1),
            selected: [],
        }), this.OnChange);
    }

    /**
     * Resets file preview
     *
     * This will remove all uploaded files
     * selected and call the callback when
     * the operation has finished its task
     *
     * The callback called is the
     * `onChange` callback.
     */
    public reset = () => {
        this.setState(prev => ({
            files: [],
            selected: [],
        }), this.OnChange);
    }



    /**
     * Handles `on change` event
     */
    private OnChange = () => {
        if(this.props.onChange) {
            this.props.onChange(this.state.files);
        }
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
