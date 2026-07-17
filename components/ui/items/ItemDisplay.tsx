import { getImage } from "@barnloppis-se/api";
import { ItemObject } from "@barnloppis-se/types/dist/src/data/item";
import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { ReactNode } from "react";

/**
 * Display props
 */
interface Props {
    /**
     * List of items to display
     */
    readonly items?: ItemObject[]
}



/**
 * Item display component
 */
export default function ItemDisplay(props: Props): ReactNode {
    return(
        <Grid container columns={{ sm: 3, md: 3, lg: 4 }} columnSpacing={4} rowSpacing={3} className="mb-12">
            {props.items?.map(item => <Grid key={item.id} size={1}>
                <Card className="max-w-96 min-w-56">
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
    );
}
