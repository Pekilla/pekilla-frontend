'use client';

import { Box, Card, CardActionArea, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CategoryView(params : any) { 

    const router = useRouter();

    const category = {
        banner : "https://media.discordapp.net/attachments/1254542150818070598/1260013821896953939/image.png?ex=668dc6d1&is=668c7551&hm=7a3acfd705a28f54114e3e257c2f5ab9328bafe1620423d333d68ee1e50c3afe&=&format=webp&quality=lossless",
        icon : "https://media.discordapp.net/attachments/1254542150818070598/1260013821896953939/image.png?ex=668dc6d1&is=668c7551&hm=7a3acfd705a28f54114e3e257c2f5ab9328bafe1620423d333d68ee1e50c3afe&=&format=webp&quality=lossless"
    }
    
    return (
            <Card
                sx={{borderRadius: 3}}
                variant="outlined">
                <CardActionArea
                    onClick={() => {router.push(`/categories/${params.name}`)}}>
                    <Image 
                        style={{objectFit: 'cover'}}
                        alt="banner"
                        width={1500} height={80} src={category.banner}/>
                    <Stack direction="row" p={3}>
                        <Image alt="icon" width={100} height={100} src={category.icon} style={{borderRadius: 30}}/>
                        <Stack justifyContent="end" mx={2}>
                            <Typography variant="h4" fontWeight={700}>{params.name}</Typography>
                            <Typography variant="h6">{params.author}</Typography>
                        </Stack>
                    </Stack>
                </CardActionArea>
            </Card>
    )
}