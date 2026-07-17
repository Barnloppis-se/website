import { Box, Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { ReactNode, useState } from "react";
import Dropdown from "../Dropdown";
import NumberField from "../NumberField";
import { DBSearch } from "@barnloppis-se/types/dist/src/upload/uploadData";

/**
 * Item display top controller properties
 */
interface Props {
    /**
     * Controller default values
     */
    readonly defaults?: {
        /**
         * Items to show per item page
         *
         * This determines how many
         * items to get from the server
         * per item getting request.
         */
        readonly show?: number

        /**
         * Default sorting method
         */
        readonly sort?: DBSearch

        /**
         * Default seller for seller searching
         *
         * The default value for searching after
         * a seller or all sellers in the database.
         */
        readonly seller?: number | "*"
    }

    /**
     * On state change event
     *
     * This is not called when the state
     * actually changes but rather when
     * the `apply` button is pressed.
     *
     * @param state Controller state
     */
    readonly onChange?: (state: {
        /**
         * Number of items to show
         */
        show: number,
        /**
         * Sorting method
         */
        sort: DBSearch,
        /**
         * Seller sorting method
         *
         * This always has a value
         * but only matters if `sort`
         * is equal to `DBSearch.seller`
         */
        seller: number | "*"
    }) => Promise<void> | void;
}



/**
 * Item display top controller component
 */
export default function ItemDisplayTopControls(props: Props): ReactNode {
    const defaults = {
        show: props.defaults?.show ?? 50,
        sort: props.defaults?.sort ?? "date",
        seller: {
            value: props.defaults?.seller === "*" ? 1 : props.defaults?.seller ?? 1,
            use: props.defaults?.seller ?? "*"
        },
    }

    const [ state, set ] = useState(defaults);

    const labelToMethod = (label: string) => {
        if(label === "Nyast") return "date";
        else if(label === "Äldsta") return "oldest";
        else if(label === "Säljare") return "seller";
        else return label as DBSearch;
    }

    const methodToLabel = (method: DBSearch) => {
        if(method === "date") return "Nyast";
        else if(method === "oldest") return "Äldsta";
        else if(method === "seller") return "Säljare";
        else return method;
    }

    return(
        <Box className="mb-12 pb-2 border-b-2 border-solid border-b-gray-500">
            <div className="flex">
                <div className="mt-4 mr-4">
                    <Dropdown
                        values={[
                            methodToLabel("Ej barn / ungdom"),
                            methodToLabel("Ej tillåten"),
                            methodToLabel("Fel säsong"),
                            methodToLabel("Felmärkt"),
                            methodToLabel("Fläckigt"),
                            methodToLabel("Nopprigt"),
                            methodToLabel("Omärkt"),
                            methodToLabel("Slitet"),
                            methodToLabel("Trasig"),
                            methodToLabel("date"),
                            methodToLabel("oldest"),
                            methodToLabel("seller")
                        ]}
                        default={methodToLabel(defaults.sort)}
                        onSelect={value => set({
                            show: state.show,
                            sort: labelToMethod(value),
                            seller: state.seller
                        })}
                    />
                </div>
                <NumberField
                    label="Antal plagg"
                    onChange={value => set({
                        show: value,
                        sort: state.sort,
                        seller: state.seller
                    })}
                    values={{ default: props.defaults?.show, min: 1 }}
                    size="medium"
                />

                <div className="ml-14 h-fit mt-8">
                    <Button variant="outlined" color="success" size="medium" className="h-10" onClick={e => {
                        e.preventDefault();

                        if(props.onChange) props.onChange({
                            show: state.show,
                            sort: state.sort,
                            seller: state.seller.use
                        });
                    }}>
                        Tillämpa
                    </Button>
                </div>
            </div>
            {state.sort === "seller" && <div className="flex ml-2">
                <NumberField
                    label="Säljare"
                    onChange={value => set({
                        show: state.show,
                        sort: state.sort,
                        seller: {
                            value: value,
                            use: value
                        }
                    })}
                    values={{ default: defaults.seller.value, min: 1 }}
                    size="medium"
                />
                <FormGroup className="mt-8 ml-4">
                    <FormControlLabel control={<Checkbox checked={state.seller.use === "*"} />} label="Alla" onClick={e => {
                        e.preventDefault();
                        set({
                            show: state.show,
                            sort: state.sort,
                            seller: {
                                value: state.seller.value,
                                use: state.seller.use === "*" ? state.seller.value : "*"
                            }
                        });
                    }} />
                </FormGroup>
            </div>}
        </Box>
    );
}
