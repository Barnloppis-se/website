"use client"
import { Box, Button, FormControl } from "@mui/material";
import { ReactNode, useRef, useState } from "react";
import Dropdown from "../Dropdown";
import { Item, tags, TAGS } from "@barnloppis-se/types/dist/src/upload/uploadData";
import FilePreview from "../dropbox/filepreview/FilePreview";
import NumberField from "../NumberField";

/**
 * Item form component properties
 */
interface Props {
    /**
     * Component class name
     */
    readonly className?: string

    /**
     * Submit event handler
     *
     * Handles form submission event handler,
     * the return value determents form element
     * resetting. If `true` the form will reset
     * when the submit is done else it will keep
     * it's values.
     *
     * @param item Item created by the form
     * @param images Images uploaded to the form
     * @returns Reset status
     */
    readonly onSubmit?: (item: Item, images: File[]) => Promise<boolean>;

    /**
     * Form input error event handler
     *
     * This is emitted when an error is
     * thrown by the form input.
     *
     * @param error Error object
     */
    readonly onError?: (error: { cause: string, message: string }) => void;
}



/**
 * Item form component
 */
export default function ItemForm(props: Props): ReactNode {
    const [ tag, setTag ] = useState<keyof typeof TAGS>("Omärkt");
    const onTag = (tag: keyof typeof TAGS) => {
        setTag(tag);
        if(tag == "Omärkt") setSeller(undefined);
        else if(!seller) setSeller(1);
    }

    const [ seller, setSeller ] = useState<number | undefined>();
    const filePreview = useRef<FilePreview>(null);

    return(<FormControl className={props.className}>
        <Box className="flex h-fit ml-32">
            <div className="mt-4 mr-12">
                <Dropdown<keyof typeof TAGS>
                    label="Välj fel"
                    onSelect={onTag}
                    default={"Omärkt"}
                    values={tags as (keyof typeof TAGS)[]}
                />
            </div>
            {tag != "Omärkt" && <div className="w-fit h-fit">
                <NumberField
                    label="Säljare"
                    size="medium"
                    onChange={setSeller}
                    values={{ min: 1, default: 1 }}
                />
            </div>}
        </Box>

        <Box className="w-4/5 py-10 m-auto">
            <FilePreview ref={filePreview}>
                <FilePreview.Dropbox
                    ref={filePreview}
                    multiple
                    accepts={["png", "jpg", "jpeg"]}
                    onValidateFile={file => {
                        const valid = ["image/png", "image/jpg", "image/jpeg"];
                        return valid.includes(file.type);
                    }}
                />
                <FilePreview.Controls ref={filePreview} />
            </FilePreview>
        </Box>
        <Box className="w-4/5 flex m-auto mt-3 border-solid border-t-2 border-bs-neutral-500">
            <Box className="w-fit h-fit m-auto my-7">
                <Button
                    className="min-w-2xs"
                    variant="outlined"
                    size="large"
                    onClick={e => {
                        e.preventDefault();

                        if(filePreview.current?.state.files.length === 0) {
                            if(props.onError) props.onError({
                                cause: "Inga bilder",
                                message: "Det finns inga bilder att ladda upp."
                            });
                            return;
                        }

                        if(props.onSubmit) {
                            const item: Item = { tag, seller };
                            const images: File[] = filePreview.current?.state.files ?? [];
                            props.onSubmit(item, images).then(res => {
                                if(!res) return;
                                filePreview.current?.reset();
                            });
                        } else {
                            filePreview.current?.reset();
                        }
                    }}
                >Ladda upp</Button>
            </Box>
        </Box>
    </FormControl>);
}
