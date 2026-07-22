import { getImage } from "@barnloppis-se/api";
import { ItemObject } from "@barnloppis-se/types/dist/src/data/item";
import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { ReactNode } from "react";
import ItemDisplayTopControls from "./ItemDisplayTopControls";
import ItemDisplayPageControls from "./ItemDisplayPageControls";

/**
 * Display props
 */
interface Props {
    /**
     * List of items to display
     */
    readonly items?: ItemObject[]

    /**
     * Display slots
     */
    readonly slots?: {
        /**
         * Top slot nodes
         *
         * This will be placed over the
         * display area.
         */
        readonly top?: ReactNode

        /**
         * Bottom slot nodes
         *
         * This will be placed under
         * the display area.
         */
        readonly bottom?: ReactNode
    }
}



/**
 * Item display component
 */
export default function ItemDisplay(props: Props): ReactNode {
    return(
        <Box className="w-full">
            {props.slots?.top}

            <Grid container columns={{ sm: 3, md: 3, lg: 4 }} columnSpacing={4} rowSpacing={3} className="mb-12">
                {props.items?.map(item => <Grid key={item.id} size={1} className="mx-auto md:mx-0">
                    <Card className="min-w-96 max-w-96 md:min-w-56">
                        <CardActionArea>
                            <CardMedia
                                className="h-60"
                                component="img"
                                src={getImage(item.id, 0)}
                                alt={`Bild på ${item.tag} plagg`}
                                loading="lazy"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" sx={{ letterSpacing: ".1rem" }} className="font-mono font-semibold">
                                    {item.tag}
                                </Typography>
                                <Box className="ml-3">
                                    {item.seller && <Typography variant="body2" color="textSecondary">
                                        Säljare, <span>{item.seller}</span>
                                    </Typography>}
                                    <Typography variant="subtitle2" color="textSecondary" className="text-xs">
                                        {item.id}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>)}
            </Grid>

            {props.slots?.bottom}
        </Box>
    );
}



/**
 * Item display top controls
 */
ItemDisplay.TopControls = ItemDisplayTopControls;

/**
 * Item display page controls
 */
ItemDisplay.PageControls = ItemDisplayPageControls;
