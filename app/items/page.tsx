"use client"
import ItemDisplay from "@/components/ui/items/ItemDisplay";
import LoadingIndicator from "@/components/ui/popup/LoadingIndicator";
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
    seller: 1 as number | "*"
}



/**
 * Images page
 */
export default function Items() {
    const [ load, setLoad ] = useState(false);
    const [ items, setItems ] = useState<ItemObject[]>([]);
    const [ state, set ] = useState({
        controls: defaults,
        amount: 0,
        page: 0
    });

    const apply = async (a: typeof defaults, b: number) => {
        setLoad(true);

        const res = await getItems("*", b * a.show, a.show, a.sort, a.seller);
        if(res.status === true) {
            setItems(res.data.items.slice(0, a.show));
            set({ controls: a, amount: res.data.size, page: b });

        } else { console.log(res); }

        setLoad(false);
    }

    useEffect(() => { apply(defaults, 0) }, []);

    return(
        <Box className="md:m-12 w-full">
            <ItemDisplay items={items} slots={{
                top: <ItemDisplay.TopControls defaults={defaults} onChange={e => apply(e, 0)}/>,
                bottom: <ItemDisplay.PageControls
                    disable={{
                        previous: state.page <= 0,
                        next: (state.page + 1) * state.controls.show >= state.amount
                    }}
                    onChange={e => {
                        const delta = e === "prev" ? -1 : 1;
                        apply(state.controls, state.page + delta);
                    }}
                >
                    Sida <span className="font-bold font-mono">[{state.page + 1} / {Math.ceil(state.amount / state.controls.show)}]</span>
                    <br />
                    <span className="font-bold font-mono">{state.amount}</span> artiklar.
                </ItemDisplay.PageControls>
            }} />
            {load && <LoadingIndicator label="Laddar" />}
        </Box>
    );
}
