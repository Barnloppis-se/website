"use client"
import { getImage, getItems } from "@barnloppis-se/api";
import { ItemObject } from "@barnloppis-se/types/dist/src/data/item";
import { Box, Card, CardActionArea, CardMedia } from "@mui/material";
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
                <Card>
                    <CardActionArea>
                        <CardMedia>
                            <img
                                src={getImage(item.id, 0)}
                                alt={`Bild på ${item.tag} plagg`}
                                loading="lazy"
                            />
                        </CardMedia>
                        {item.tag}
                    </CardActionArea>
                </Card>
            </Box>)}
        </Box>
    );
}
