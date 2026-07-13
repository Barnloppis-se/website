"use client"
import ItemForm from "@/components/ui/form/ItemForms";
import Popup from "@/components/ui/popup/Popup";
import { upload } from "@barnloppis-se/api";
import { useState } from "react";

export default function Home() {
    const [ popup, setPopup ] = useState({
        title: "",
        message: "",
        error: false,
        canClose: true,
        show: false,
    });

    return (
        <div className="w-full flex flex-wrap">
            <ItemForm
                className="bg-amber-50 w-4/5 h-fit m-auto flex flex-wrap"
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
                        setPopup({
                            title: "Ett fel uppstod",
                            message: "Kunde inte ladda upp data till servern.",
                            error: true,
                            show: true,
                            canClose: true,
                        });
                        return false;
                    }

                    // Upload images

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
