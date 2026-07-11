"use client"
import { Box, MenuItem, TextField } from "@mui/material";
import { ReactNode } from "react";

/**
 * Dropdown menu props
 */
export interface Props<T> {
    /**
     * Dropdown label
     */
    readonly label?: ReactNode

    /**
     * Default value
     */
    readonly default?: T

    /**
     * Dropdown helper text
     *
     * Can also be an object
     */
    readonly helper?: ReactNode,

    /**
     * List of values
     */
    readonly values: T[]

    /**
     * On value selection event callback
     *
     * @param value Selected value
     */
    readonly onSelect?: (value: T) => void
}



/**
 * Dropdown component object
 */
export default function Dropdown<T>( args: Props<T> ) : ReactNode {
    const toString = (value: string) => {
        let res = value
            .toString()
            .toLowerCase()
            .replace("_", " ");
        res = res.charAt(0).toUpperCase() + res.slice(1, res.length)
        return res;
    }


    return(<Box component="form" autoComplete="off" noValidate sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
        <div>
            <TextField onChange={value => {
                value.preventDefault();
                if(args.onSelect) args.onSelect(value.target.value as T)
            }} id="outlined-select-currency" select label={args.label} defaultValue={args.default} helperText={args.helper}>
                {args.values.map(obj => (<MenuItem key={`${obj}`} value={`${obj}`}>
                    {toString(`${obj}`)}
                </MenuItem>))}
            </TextField>
        </div>
    </Box>);
}
