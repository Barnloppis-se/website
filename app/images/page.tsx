"use client"
import { getItems } from "@barnloppis-se/api";
import { ItemObject } from "@barnloppis-se/types/dist/src/data/item";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

/**
 * Images page
 */
export default function Images() {
    const [ items, setItems ] = useState<ItemObject[]>([]);

    useEffect(() => {
        (async () => {
            const res = await getItems("*", 0, 50);
            if(res.status === true) setItems(res.data.items);
        })();
    }, []);

    return(
        <Box>
            {items.map(item => <Box key={item.id}>
                {item.tag}
            </Box>)}
        </Box>
    );
}
