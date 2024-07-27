"use client";

import { Card, CardActionArea, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CategoryView(params: any) {
    const router = useRouter();

    return (
        <Card
            sx={{ borderRadius: 3 }}
            variant="outlined">
            <CardActionArea
                onClick={() => { router.push(`/categories/${params.name}`) }}>
                <Image
                    style={{ objectFit: 'cover' }}
                    alt="banner"
                    width={1500} height={80} src={params.banner} />
                <Stack direction="row" p={3}>
                    <Image alt="icon" width={100} height={100} src={params.icon} style={{ borderRadius: 30 }} />
                    <Stack justifyContent="end" mx={2}>
                        <Typography variant="h4" fontWeight={700}>{params.name}</Typography>
                        <Typography variant="h6">{params.author}</Typography>
                    </Stack>
                </Stack>
            </CardActionArea>
        </Card>
    )
}