'use client';

import { Avatar, Box, Button, Card, Stack, Typography } from "@mui/material";
import GroupAddIcon from '@mui/icons-material/GroupAdd';


// IN PROGRESS 

export default function UserView() {

    const user = {
        name : "minus415",
        role : "Admin",
    }

    const bannerStyle = {
        height: 150,
        backgroundImage: "url('https://images-ext-1.discordapp.net/external/-AYFgaaFCTDgYkeFlJjtwFK79woW647ech2hlPPXlDk/%3Fw%3D650/https/www.indiewire.com/wp-content/uploads/2016/08/big-totoro-e1538413562225.jpeg?format=webp')",
        backgroundPosition: "center",
        backgroundSize: "cover"
    }

    const avatarStyle = {
        width: 150, 
        height: 150,
        borderRadius: 2
    }

    return (
        <Card
            sx={{borderRadius: 3}}
            variant="outlined">
                <Box sx={bannerStyle}/>
                <Stack direction="row" p={3}>
                    <Avatar sx={avatarStyle}>{user.name.charAt(0)}</Avatar>
                    <Box  style={{borderRadius: 30}}/>
                    <Stack gap={5} mx={2}>
                        <Stack>
                            <Typography variant="h4" fontWeight={700}>{user.name}</Typography>
                            <Stack direction="row" justifyContent="center" gap={5}>
                                <Typography>Posts  0</Typography>
                                <Typography>Comments  0</Typography>
                                <Typography>Posts  0</Typography>
                            </Stack>
                        </Stack>
                        <Button endIcon={<GroupAddIcon/>}>Follow</Button>
                    </Stack>
                </Stack>
        </Card>
    )
}