import { Box, ImageList, ImageListItem } from "@mui/material";
import { Component, ContextType, createContext, ReactNode, RefAttributes, useContext } from "react";
import FilePreviewControls, { FilePreviewControlProps } from "./FilePreviewControls";
import Dropbox, { DropboxProps } from "../Dropbox";
import { Delete } from "@mui/icons-material";

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
    readonly hovers: {[id: number]: boolean}
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



    static contextType = createContext<State>({ files: [], hovers: [] });
    context!: ContextType<typeof FilePreview.contextType>;

    /**
     * File preview state
     */
    state: Readonly<State> = {
        files: [],
        hovers: [],
    }



    render = () => (<Box>
        <FilePreview.contextType.Provider value={this.state}>
            <Box className="w-full h-fit">{this.props.children}</Box>
            <Box className="flex w-full h-fit pt-3">
                <ImageList className="w-4/5 h-fit min-h-36 m-auto overflow-y-visible" variant="masonry" cols={3} gap={8}>
                    {this.state.files.map(file => <ImageListItem key={this.state.files.indexOf(file)}>
                        <div className="flex size-full"
                            onMouseOver={e => {
                                e.preventDefault();
                                this.hover(file);
                            }}
                            onMouseOut={e => {
                                e.preventDefault();
                                this.stopHover(file);
                            }}
                            onClick={e => {
                                e.preventDefault();
                                if(this.isHovering(file)) this.remove(file);
                            }}
                        >
                            <img
                                src={URL.createObjectURL(file)}
                                alt={`${file.webkitRelativePath}/${file.name}`}
                                loading="lazy"
                                className={this.isHovering(file) ? "blur-sm" : ""}
                            />
                            {this.isHovering(file) && <div className="absolute flex size-full">
                                <div className="size-fit m-auto">
                                    <Delete className="size-16" color="error" fontSize="large" />
                                </div>
                            </div>}
                        </div>
                    </ImageListItem>)}
                </ImageList>
            </Box>
        </FilePreview.contextType.Provider>
    </Box>);



    /**
     * Updates hover status over file object
     *
     * @param file File to hover
     */
    public hover = (file: File) => {
        const hover = this.state.hovers;
        hover[this.state.files.indexOf(file)] = true;

        this.setState(prev => ({
            files: prev.files,
            hovers: hover,
        }), () => {if(this.props.onChange) this.props.onChange(this.state.files)});
    }

    /**
     * Checks if currently hovering over set file
     *
     * @param file File to check
     * @returns Hovering status
     */
    public isHovering = (file: File) => this.state.hovers[this.state.files.indexOf(file)];

    /**
     * Stops hover over file object
     *
     * @param file File to stop hover over
     */
    public stopHover = (file: File) => {
        const hover = this.state.hovers;
        hover[this.state.files.indexOf(file)] = false;

        this.setState(prev => ({
            files: prev.files,
            hovers: hover,
        }), () => {if(this.props.onChange) this.props.onChange(this.state.files)});
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
            hovers: [],
        }), () => {if(this.props.onChange) this.props.onChange(this.state.files)});
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
            hovers: [],
        }), () => {if(this.props.onChange) this.props.onChange(this.state.files)});
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
            hovers: [],
        }), () => {if(this.props.onChange) this.props.onChange(this.state.files)});
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
