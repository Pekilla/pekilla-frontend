'use client';

import { Box, Card, CardActionArea, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CategoryView(params : any) { 

    const router = useRouter();

    const category = {
        banner : "https://media.discordapp.net/attachments/431210009515524096/1251501601282330704/4300D4E3-59EF-490B-98C7-CAEEC2DE216A.jpg?ex=668bd031&is=668a7eb1&hm=5a0d5f518a32318c6394da9a083d9e3716f5a9552893b29cdb5c27096979b017&=&format=webp&width=690&height=920",
        icon : "https://media.discordapp.net/attachments/1197651404349784124/1259396971152805899/image.png?ex=668c3114&is=668adf94&hm=aa3d4539e9d274d3bd76639c7ab7cd7b64b129d035c5bb001d379f87529e9060&=&format=webp&quality=lossless"
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