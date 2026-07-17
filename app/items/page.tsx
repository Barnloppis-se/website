"use client"
import ItemDisplay from "@/components/ui/items/ItemDisplay";
import { getItems } from "@barnloppis-se/api";
import { ItemObject } from "@barnloppis-se/types/dist/src/data/item";
import { DBSearch } from "@barnloppis-se/types/dist/src/upload/uploadData";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

/**
 * Default values
 */
const defaults = {
    show: 50,
    sort: "date" as DBSearch,
    seller: "*" as number | "*"
}



/**
 * Images page
 */
export default function Items() {
    const [ items, setItems ] = useState<ItemObject[]>([]);

    const [ max, setMax ] = useState(50);
    const [ first, setFirst ] = useState(0);



    const apply = async (state: typeof defaults) => {
        // Start load

        const res = await getItems("*", first, state.show, state.sort, state.seller);
        if(res.status === true) {
            setItems(res.data.items.slice(first, first + state.show));
            setMax(res.data.size);

        } else { console.log(res); }

        // End load
    }

    useEffect(() => { apply(defaults) }, []);

    return(
        <Box className="m-12">
            <ItemDisplay items={items} slots={{
                top: <ItemDisplay.TopControls defaults={defaults} onChange={apply}/>
            }} />


            {/* Page selector */}
        </Box>
    );
}
