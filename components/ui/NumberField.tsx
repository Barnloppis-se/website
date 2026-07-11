import { NumberField as base } from "@base-ui/react";
import { Box, Button, FormControl, FormLabel, OutlinedInput } from "@mui/material";
import { ReactNode, useId } from "react";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

/**
 * Number field properties
 */
interface Props {
    /**
     * Field label
     */
    readonly label?: string

    /**
     * Field size
     */
    readonly size: "medium" | "small"

    /**
     * Field error
     */
    readonly error?: boolean

    /**
     * Minimum field size
     */
    readonly min?: number

    /**
     * Maximum field size
     */
    readonly max?: number

    /**
     * Field value settings
     */
    readonly values?: {
        /**
         * Minimum value
         */
        readonly min?: number

        /**
         * Maximum value
         */
        readonly max?: number

        /**
         * Default value
         */
        readonly default?: number
    }

    /**
     * Component ID
     */
    readonly id?: string

    /**
     * Callback for when the value changes
     *
     * @param value New value
     */
    readonly onChange?: (value: number) => void
}

export default function NumberField(args: Props) : ReactNode {
    const id = args.id ?? useId();

    return(<base.Root
                defaultValue={args.values?.default}
                onValueChange={e => args.onChange && e ? args.onChange(e) : undefined}
                min={args.values?.min}
                max={args.values?.max}
                render={(props, state) => (
                    <FormControl
                        size={args.size}
                        ref={props.ref}
                        disabled={state.disabled}
                        required={state.required}
                        error={args.error}
                        variant="outlined"
                        sx={{
                            '& .MuiButton-root': {
                            borderColor: 'divider',
                            minWidth: 0,
                            bgcolor: 'action.hover',
                            '&:not(.Mui-disabled)': {
                                color: 'text.primary',
                            },
                            },
                        }}
                    >
                        {props.children}
                    </FormControl>
                )}>
        <base.ScrubArea render={
            <Box component="span" sx={{ userSelect: 'none', width: 'max-content' }} />
        }>
            <FormLabel htmlFor={id} sx={{
                display: 'inline-block',
                cursor: 'ew-resize',
                fontSize: '0.875rem',
                color: 'text.primary',
                fontWeight: 500,
                lineHeight: 1.5,
                mb: 0.5,
            }}>
                {args.label}
            </FormLabel>
            <base.ScrubAreaCursor>
                <OpenInFullIcon
                    fontSize="small"
                    sx={{ transform: 'translateY(12.5%) rotate(45deg)' }}
                />
            </base.ScrubAreaCursor>
        </base.ScrubArea>
        <Box sx={{ display: "flex" }}>
            <base.Decrement
                render={
                    <Button
                        variant="outlined"
                        aria-label="Decrease"
                        size={args.size}
                        sx={{
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                            borderRight: '0px',
                            '&.Mui-disabled': {
                            borderRight: '0px',
                            },
                        }}
                    />
                }>
                <RemoveIcon fontSize={"inherit"} />
            </base.Decrement>
            <base.Input id={id}
                render={(props, state) => (
                    <OutlinedInput
                        inputRef={props.ref}
                        value={state.inputValue}
                        onBlur={props.onBlur}
                        onChange={props.onChange}
                        onKeyUp={props.onKeyUp}
                        onKeyDown={props.onKeyDown}
                        onFocus={props.onFocus}
                        slotProps={{
                            input: {
                                ...props,
                                size: (() => {
                                    const i = args.min ?? 1;
                                    const j = args.max ?? 1;

                                    const min = Math.max(i, state.inputValue.length || 1) + 1;
                                    const max = Math.min(j, min) + 1;

                                    return max;
                                })(),
                                sx: {
                                    textAlign: 'center',
                                },
                            },
                        }}
                        sx={{ pr: 0, borderRadius: 0, flex: 1 }}
                    />
                )}
            />
            <base.Increment
                render={
                    <Button
                    variant="outlined"
                    aria-label="Increase"
                    size={args.size}
                    sx={{
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        borderLeft: '0px',
                        '&.Mui-disabled': {
                        borderLeft: '0px',
                        },
                    }}
                    />
                }
                >
                <AddIcon fontSize={"inherit"} />
            </base.Increment>
        </Box>
    </base.Root>);
}
