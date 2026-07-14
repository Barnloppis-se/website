"use client"
import ItemForm from "@/components/ui/form/ItemForms";
import Popup from "@/components/ui/popup/Popup";
import { upload, uploadImage } from "@barnloppis-se/api";
import imageCompression, { Options } from "browser-image-compression";
import { ReactNode, useState } from "react";

export default function Home() {
    const [ popup, setPopup ] = useState<{
        title: string,
        message: ReactNode,
        error: boolean,
        canClose: boolean,
        show: boolean
    }>({
        title: "",
        message: "",
        error: false,
        canClose: true,
        show: false,
    });

    return (
        <div className="w-full flex flex-wrap">
            <ItemForm
                className="w-4/5 h-fit m-auto flex flex-wrap"
                onError={error => {
                    setPopup({
                        title: error.cause,
                        message: error.message,
                        error: true,
                        canClose: true,
                        show: true,
                    });
                }}
                onSubmit={async (item, images) => {
                    const res = await upload(item);
                    if(res.status === false) {
                        setPopup(setPopupError(
                            "Ett fel uppstod",
                            <>
                                Kunde inte ladda upp data till servern.
                                Detta kan vara ett resultat av dålig internetuppkoppling.
                                Ha en trevligt fortsatt dag och hoppas problemet inte kvarstår!
                            </>
                        ));
                        return false;
                    }

                    let errors = 0;
                    for(const image of await compressList(images)) {
                        const rm = await uploadImage(res.item, image.stream());
                        if(rm.status === false) errors++;
                    }

                    if(errors !== 0) setPopup(setPopupError(
                        "Ett fel uppstod",
                        <>
                            <span className="text-gray-900 font-mono font-semibold">[{errors}/{images.length}]</span> bilder laddades inte upp.
                            Kolla din internetuppkoppling eller om bilden verkerligen är en bild av
                            godkänt format. Ha en trevligt fortsatt dag och hoppas att problemet inte kvarstår!
                        </>
                    ));

                    return true;
                }}
            />
            <Popup
                title={popup.title}
                message={popup.message}
                canClose={popup.canClose}
                onClose={() => {
                    setPopup({
                        title: "",
                        message: "",
                        error: false,
                        canClose: true,
                        show: false,
                    });
                }}
                show={popup.show}
                type={popup.error ? "error" : "standard"}
            />
        </div>
    );
}



/**
 * Compresses image file
 *
 * If the option is set to `strict`
 * only compressed files will be
 * returned. Else all files compressed
 * or not will be returned.
 *
 * @param file File to compress
 * @param strict Don't return uncompressed files
 * @param options Compress options
 * @returns Compressed file
 */
const compress = async (file: File, strict: boolean, options: Options) => {
    try {
        return await imageCompression(file, options);
    } catch(error) {
        console.log(error);
        if(strict) return file;
    }
}

/**
 * Compresses a list of files
 *
 * @param files Files to compress
 * @param strict Include uncompressed files in list
 * @param options Compress options
 * @returns List of the files compressed
 */
const compressList = async (files: File[], strict: boolean = false, options: Options = { maxSizeMB: 1, maxWidthOrHeight: 512, useWebWorker: true }) => {
    const list = [];
    for(const file of files) {
        const compressed = await compress(file, strict, options);
        if(compressed) list.push(compressed);
    }
    return list;
}

/**
 * Creates error popup
 *
 * @param cause Error cause
 * @param message Error message
 */
const setPopupError = (cause: string, message: ReactNode) => {
    return {
        title: cause,
        message: message,
        error: true,
        canClose: true,
        show: true,
    };
}
