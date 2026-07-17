import { Box, Button, Typography } from "@mui/material";
import { ReactNode } from "react";

/**
 * Item display page controller props
 */
interface Props {
    /**
     * Component children
     */
    readonly children?: ReactNode

    /**
     * Controls disable settings
     */
    readonly disable?: {
        /**
         * Disable `previous` button
         */
        readonly previous?: boolean

        /**
         * Disable `next` button
         */
        readonly next?: boolean
    }

    /**
     * On page change event handler
     *
     * The delta value specifies
     * in what page direction to
     * move.
     *
     * @param delta Changing direction
     */
    readonly onChange?: (delta: "prev" | "next") => void;
}



/**
 * Item display page controller
 */
export default function ItemDisplayPageControls(props: Props): ReactNode {
    return(
        <Box className="mt-12 py-12 border-t-2 border-solid border-t-gray-500 flex justify-center">
            <Button variant="outlined" disabled={props.disable?.previous} className="my-auto" onClick={e => {
                e.preventDefault();
                if(props.onChange) props.onChange("prev");
            }}>Föregående</Button>
            <Typography className="my-auto mx-14 text-center">{props.children}</Typography>
            <Button variant="outlined" disabled={props.disable?.next} className="my-auto" onClick={e => {
                e.preventDefault();
                if(props.onChange) props.onChange("next");
            }}>Nästa</Button>
        </Box>
    );
}
