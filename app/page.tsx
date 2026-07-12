"use client"
import Dropbox from "@/components/ui/dropbox/Dropbox";
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
    const images = useRef<FilePreview>(null);



    return (
        <div className="flex flex-wrap m-auto">
            <FormControl className="bg-amber-50 w-3xs h-fit">
                <Dropdown<keyof typeof TAGS>
                    label="Välj fel"
                    onSelect={onTag}
                    default={"Omärkt"}
                    values={tags as (keyof typeof TAGS)[]}
                />

                {tag != "Omärkt" && <div className="w-fit h-fit">
                    <NumberField
                        label="Säljare"
                        size="medium"
                        onChange={setSeller}
                        values={{ min: 1, default: 1 }}
                    />
                </div>}



                {/* Image input */}
                <FilePreview ref={images}>
                    <FilePreview.Dropbox
                        multiple
                        accepts={["png", "jpg", "jpeg"]}
                        onValidateFile={file => {
                            const valid = ["image/png", "image/jpg", "image/jpeg"];
                            return valid.includes(file.type);
                        }}
                    />
                    <FilePreview.Controls />
                </FilePreview>

                {/* {dropbox.current && dropbox.current.state.files.map(value => <div
                    key={value.name}
                    className="w-full h-fit bg-amber-900"
                >
                    {value.name}
                </div>)} */}



                <Button
                    variant="outlined"
                    size="medium"
                    // disabled={(() => {
                    //     const dis = (seller && tag != "Omärkt") == false;
                    //     return dis;
                    // })()}
                    onClick={e => {
                        e.preventDefault();

                        const item: Item = {
                            tag,
                            seller
                        }

                        console.log(item)
                    }}
                >Ladda upp</Button>
            </FormControl>
        </div>
    );
}
