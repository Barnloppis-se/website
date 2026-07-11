import { Box, FormLabel } from "@mui/material";
import { ReactNode } from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function Dropbox() : ReactNode {
    return(<Box className="flex items-center justify-center w-full">
        <FormLabel htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 bg-neutral-secondary-medium border border-dashed border-default-strong rounded-base cursor-pointer hover:bg-neutral-tertiary-medium">
            <div className="flex flex-col items-center justify-center text-body pt-5 pb-6">
                <CloudUploadIcon fontSize="large" />
                <p className="mb-2 text-sm"><span className="font-semibold">Ladda upp</span> eller släpp bild över fältet</p>
                <p className="text-xs">PNG, JPG, JPEG</p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" multiple />
        </FormLabel>
    </Box>)
}
