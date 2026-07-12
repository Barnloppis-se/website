"use client"
import FilePreview from "@/components/ui/dropbox/filepreview/FilePreview";
import Dropdown from "@/components/ui/Dropdown";
import NumberField from "@/components/ui/NumberField";
import { Item, TAGS, tags } from "@barnloppis-se/types/dist/src/upload/uploadData";
import { Box, Button, FormControl } from "@mui/material";
import { useRef, useState } from "react";

export default function Home() {
    const [ tag, setTag ] = useState<keyof typeof TAGS>("Omärkt");
    const onTag = (tag: keyof typeof TAGS) => {
        setTag(tag);
        if(tag == "Omärkt") setSeller(undefined);
        else if(!seller) setSeller(1);
    }

    const [ seller, setSeller ] = useState<number | undefined>();
    const filePreview = useRef<FilePreview>(null);

    return (
        <div className="w-full flex flex-wrap">
            <FormControl className="bg-amber-50 w-4/5 h-fit m-auto flex flex-wrap">
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
                                    console.log("Can't upload empty threat");

                                    // Display error

                                    return;
                                }



                                // Upload item

                                // Upload compressed version of image

                                const item: Item = {
                                    tag,
                                    seller
                                }

                                console.log(item);
                            }}
                        >Ladda upp</Button>
                    </Box>
                </Box>
            </FormControl>
        </div>
    );
}
