import { CircularProgress, Typography } from "@mui/material";
import { ReactNode } from "react";

/**
 * Loading indicator properties
 */
interface Props {
    /**
     * Indicator label
     */
    readonly label?: ReactNode

    /**
     * Display indicator locally in component
     *
     * If this is `true` then the indicator
     * will be bound to an component. Otherwise
     * it will display on the hole screen.
     * In both cases it is not possible to
     * click behind it.
     */
    readonly local?: boolean
}



/**
 * Loading indicator component
 */
export default function LoadingIndicator(props: Props): ReactNode {
    return(
        <div className={`${props.local ? "relative size-full" : "fixed w-screen h-screen"} items-center top-0 left-0 border border-gray-800 rounded-base shadow-xs text-white`} style={{ backgroundColor: "rgb(15, 18, 27, .7)" }}>
            <div className="size-full flex">
                <div className="size-fit m-auto justify-center text-center">
                    <CircularProgress color="primary" />
                    <Typography className="text-inherit">{props.label}</Typography>
                </div>
            </div>
        </div>
    );
}
