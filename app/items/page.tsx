"use client"
import Dropdown from "@/components/ui/Dropdown";
import ItemDisplay from "@/components/ui/items/ItemDisplay";
import NumberField from "@/components/ui/NumberField";
import { getItems } from "@barnloppis-se/api";
import { ItemObject } from "@barnloppis-se/types/dist/src/data/item";
import { DBSearch } from "@barnloppis-se/types/dist/src/upload/uploadData";
import { Box, Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useEffect, useState } from "react";

/**
 * Default values
 */
const defaults = {
    /**
     * The amount of items to
     * show by default.
     */
    show: 50,

    /**
     * Default sorting method
     */
    sort: {
        /**
         * Method
         */
        method: "date",
        /**
         * Label
         */
        label: "Nyast",

        /**
         * Seller
         */
        seller: 1
    }
}



/**
 * Images page
 */
export default function Items() {
    const [ items, setItems ] = useState<ItemObject[]>([]);
    const [ max, setMax ] = useState(50);
    const [ show, setShow ] = useState(defaults.show);
    const [ first, setFirst ] = useState(0);
    const [ sort, setSort ] = useState<DBSearch>(defaults.sort.method as DBSearch);
    const [ seller, setSeller ] = useState<{ value: number, use: number | "*" }>({value: defaults.sort.seller, use: defaults.sort.seller});

    const apply = async () => {
        // Start load

        const res = await getItems("*", first, show, sort, seller.use);
        if(res.status === true) {
            setItems(res.data.items.slice(first, first + show));
            setMax(res.data.size);

        } else { console.log(res); }

        // End load
    }

    useEffect(() => { apply() }, []);

    return(
        <Box className="m-12">
            <Box className="mb-12 pb-2 border-b-2 border-solid border-b-gray-500">
                <div className="flex">
                    <div className="mt-4 mr-4">
                        <Dropdown
                            values={["Ej barn / ungdom", "Ej tillåten", "Fel säsong", "Felmärkt", "Fläckigt", "Nopprigt", "Omärkt", "Slitet", "Trasig", "Nyast", "Äldsta", "Säljare"]}
                            default={defaults.sort.label}
                            onSelect={value => {
                                if(value === "Nyast") setSort("date");
                                else if(value === "Äldsta") setSort("oldest");
                                else if(value === "Säljare") setSort("seller");
                                else setSort(value as DBSearch);
                            }}
                        />
                    </div>
                    <NumberField
                        label="Antal plagg"
                        onChange={setShow}
                        values={{ default: defaults.show, min: 1 }}
                        size="medium"
                    />

                    <div className="ml-14 h-fit mt-8">
                        <Button variant="outlined" color="success" size="medium" className="h-10" onClick={e => {
                            e.preventDefault();
                            apply();
                        }}>
                            Tillämpa
                        </Button>
                    </div>
                </div>
                {sort === "seller" && <div className="flex ml-2">
                    <NumberField
                        label="Säljare"
                        onChange={value => setSeller({ value, use: value })}
                        values={{ default: defaults.sort.seller, min: 1 }}
                        size="medium"
                    />
                    <FormGroup className="mt-8 ml-4">
                        <FormControlLabel control={<Checkbox checked={seller.use === "*"} />} label="Alla" onClick={e => {
                            e.preventDefault();
                            setSeller({
                                value: seller.value,
                                use: seller.use === "*" ? seller.value : "*"
                            });
                        }} />
                    </FormGroup>
                </div>}
            </Box>


            <ItemDisplay items={items} />
        </Box>
    );
}
