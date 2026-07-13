import { Box, Button, Modal, Typography } from "@mui/material";
import { ReactNode } from "react";

/**
 * Popup component props
 */
interface Props {
    /**
     * Popup content type
     */
    readonly type?: "standard" | "error"

    /**
     * Popup title
     */
    readonly title: ReactNode

    /**
     * Popup message
     */
    readonly message: ReactNode

    /**
     * Show popup
     */
    readonly show?: boolean

    /**
     * Can close popup status
     */
    readonly canClose?: boolean

    /**
     * Popup close event handler
     */
    readonly onClose?: () => void
}



/**
 * Popup component
 */
export default function Popup(props: Props): ReactNode {
    return(<Modal
            className="flex"
            open={props.show ?? true}
            onClose={() => {
                if(props.canClose !== false && props.onClose) props.onClose();
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
        <Box className="m-auto w-2/4 h-fit rounded-2xl bg-white">
            <Box className="w-full h-fit min-h-64">
                <Typography variant="h3" color={props.type === "error" ? "error" : "textPrimary"} className="w-4/5 h-fit pb-2 px-6 mt-12 m-auto border-solid border-b-2 capitalize font-mono font-semibold border-b-gray-700">
                    {props.title}
                </Typography>
                <Typography className="w-4/5 px-8 my-12 m-auto text-gray-700">
                    {props.message}
                </Typography>
            </Box>
            <Box className="m-auto mb-10 size-fit">
                <Button
                    className="min-w-36"
                    onClick={e => {
                        e.preventDefault();
                        if(props.onClose) props.onClose();
                    }}
                    disabled={props.canClose === false}
                    variant="outlined"
                    color={props.type === "error" ? "error" : "secondary"}>Stäng</Button>
            </Box>
        </Box>
    </Modal>);
}
