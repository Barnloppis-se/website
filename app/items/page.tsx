"use client"
import Dropdown from "@/components/ui/Dropdown";
import ItemDisplay from "@/components/ui/items/ItemDisplay";
import NumberField from "@/components/ui/NumberField";
import { getItems } from "@barnloppis-se/api";
import { ItemObject } from "@barnloppis-se/types/dist/src/data/item";
import { DBSearch } from "@barnloppis-se/types/dist/src/upload/uploadData";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

/**
 * Images page
 */
export default function Items() {
    const [ items, setItems ] = useState<ItemObject[]>([]);
    const [ max, setMax ] = useState(50);
    const [ show, setShow ] = useState(50);
    const [ first, setFirst ] = useState(0);
    const [ sort, setSort ] = useState<DBSearch>("date");

    useEffect(() => {
        (async () => {
            const res = await getItems("*", first, show, sort);
            if(res.status === true) {
                setItems(res.data.items);
                setMax(res.data.size);
                if(show > res.data.size) setShow(res.data.size);
            }
        })();
    }, []);

    return(
        <Box className="m-12">
            <Box className="flex mb-12 pb-2 border-b-2 border-solid border-b-gray-500">
                <div className="mt-4">
                    <Dropdown
                        values={["Ej barn / ungdom", "Ej tillåten", "Fel säsong", "Felmärkt", "Fläckigt", "Nopprigt", "Omärkt", "Slitet", "Trasig", "Nyast", "Äldsta", "Säljare"]}
                        default="Omärkt"
                    />
                </div>
                <NumberField
                    label="Antal plagg"
                    onChange={setShow}
                    value={show}
                    values={{ min: 1, max }}
                    size="medium"
                />
            </Box>
            <ItemDisplay items={items}>
            </ItemDisplay>
        </Box>
    );
}
