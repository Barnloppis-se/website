import { Box, FormLabel } from "@mui/material";
import { ReactNode, RefObject } from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FilePreview from "./filepreview/FilePreview";

/**
 * Dropbox properties
 */
export interface DropboxProps {
    /**
     * File preview instance
     */
    readonly ref?: RefObject<FilePreview | null>

    /**
     * List of accepted file formats
     *
     * #### Example,
     * `["image/*"]` for all image formats
     * or `["png", "jpg", "jpeg"]` for only
     * specific formats.
     *
     * This is not limited to images.
     */
    readonly accepts?: string[]

    /**
     * Accepts multiple files to be uploaded
     */
    readonly multiple?: boolean

    /**
     * Validates file
     *
     * If this is `true` the file
     * is added to the file content
     * list state.
     *
     * @param file File to validate
     */
    readonly onValidateFile?: (file: File) => boolean

    /**
     * On dropbox file upload change
     *
     * This is emitted when one or more
     * files are selected by this dropbox.
     *
     * @param files List of uploaded files
     */
    readonly onChange?: (files: File[]) => void
}



/**
 * Dropbox component
 *
 * Dropbox - provides file upload input
 * for multiple files or one.
 */
export default function Dropbox (props: DropboxProps): ReactNode {
    const [ accepts, helpers ] = getFormats(props.accepts ?? [ "image/*" ]);
    const validate = props.onValidateFile ?? (file => true);

    return (<Box className="flex items-center justify-center w-full">
        <FormLabel htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 bg-neutral-secondary-medium border border-dashed border-default-strong rounded-md cursor-pointer hover:bg-neutral-tertiary-medium">
            <div className="flex flex-col items-center justify-center text-body pt-5 pb-6">
                <CloudUploadIcon fontSize="large" />
                <p className="mb-2 text-sm"><span className="font-semibold">Ladda upp</span> eller släpp bild över fältet</p>
                <p className="text-xs">{helpers}</p>
            </div>

            <input onChange={e => {
                e.preventDefault();
                const list = [];
                if(e.target.files) for(let i = 0; i < e.target.files.length; i++) {
                    const file = e.target.files[i];
                    if(validate(file)) list.push(file);
                }
                if(props.onChange) props.onChange(list);
                else if(props.ref?.current) props.ref?.current.add(list);
            }} id="dropzone-file" type="file" className="hidden" multiple={props.multiple} accept={accepts} />
        </FormLabel>
    </Box>);
}





/**
 * Gets help label string from format
 *
 * @param format File format ( extension ) type
 * @returns Helper label string of format
 */
const getHelperLabelString = (format: string) => {
    if(format.toLowerCase() === "image/*") return "GIF, PNG, JPG, JPEG";
    return `${format.toUpperCase()}`;
}

/**
 * Gets accept string from format
 *
 * @param format File format ( extension ) type
 * @returns Accepts string of format
 */
const getAcceptsString = (format: string) => {
    if(format.toLowerCase() === "image/*") return format
    return `.${format.toLowerCase()}`;
}

/**
 * Gets formats acceptor and helper labels
 *
 * @param formats File formats ( extensions )
 * @returns Accepted formats and helper labels for dropbox and file inputs
 */
const getFormats = (formats: string[]) => {
    let accepts = "";
    let helpers = "";
    for(const index in formats) {
        const format = formats[index];
        helpers = `${helpers ? helpers + "," : ""} ${getHelperLabelString(format)}`.trim();
        accepts = `${accepts} ${getAcceptsString(format)}`.trim();
    }
    return [ accepts, helpers ];
}
