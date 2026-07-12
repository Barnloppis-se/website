import { Box, FormLabel } from "@mui/material";
import { Component, Context, ContextType } from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FilePreview from "./filepreview/FilePreview";

/**
 * Dropbox properties
 */
interface Props {
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
export default class Dropbox extends Component<Props> {
    static contextType = FilePreview.contextType;
    context!: ContextType<typeof FilePreview.contextType>

    /**
     * File formats accepted by this input
     */
    private readonly accepts: string;

    /**
     * Helper label for file input
     */
    private readonly helpers: string;

    /**
     * Validates file
     *
     * If the file is valid ( `true` ) then
     * it is added to the state list of files.
     */
    private readonly validate: (value: File) => boolean;



    constructor(props: Props) {
        super(props);
        [ this.accepts, this.helpers ] = Dropbox.getFormats(props.accepts ?? [ "image/*" ]);
        this.validate = props.onValidateFile ?? (file => true);
    }



    render = () => (<Box className="flex items-center justify-center w-full">
        <FormLabel htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 bg-neutral-secondary-medium border border-dashed border-default-strong rounded-base cursor-pointer hover:bg-neutral-tertiary-medium">
            <div className="flex flex-col items-center justify-center text-body pt-5 pb-6">
                <CloudUploadIcon fontSize="large" />
                <p className="mb-2 text-sm"><span className="font-semibold">Ladda upp</span> eller släpp bild över fältet</p>
                <p className="text-xs">{this.helpers}</p>
            </div>

            <input onChange={e => {
                e.preventDefault();
                const list = [];
                if(e.target.files) for(let i = 0; i < e.target.files.length; i++) {
                    const file = e.target.files[i];
                    if(this.validate(file)) list.push(file);
                }
                if(this.props.onChange) this.props.onChange(list);
                else this.context.add(list);
            }} id="dropzone-file" type="file" className="hidden" multiple={this.props.multiple} accept={this.accepts} />
        </FormLabel>
    </Box>);





    /**
     * Gets help label string from format
     *
     * @param format File format ( extension ) type
     * @returns Helper label string of format
     */
    public static getHelperLabelString = (format: string) => {
        if(format.toLowerCase() === "image/*") return "GIF, PNG, JPG, JPEG";
        return `${format.toUpperCase()}`;
    }

    /**
     * Gets accept string from format
     *
     * @param format File format ( extension ) type
     * @returns Accepts string of format
     */
    public static getAcceptsString = (format: string) => {
        if(format.toLowerCase() === "image/*") return format
        return `.${format.toLowerCase()}`;
    }

    /**
     * Gets formats acceptor and helper labels
     *
     * @param formats File formats ( extensions )
     * @returns Accepted formats and helper labels for dropbox and file inputs
     */
    public static getFormats = (formats: string[]) => {
        let accepts = "";
        let helpers = "";
        for(const index in formats) {
            const format = formats[index];
            helpers = `${helpers ? helpers + "," : ""} ${this.getHelperLabelString(format)}`.trim();
            accepts = `${accepts} ${this.getAcceptsString(format)}`.trim();
        }
        return [ accepts, helpers ];
    }
}
