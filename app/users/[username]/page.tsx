import { Avatar, Box, Button, Card, Container, Divider, Stack, Typography } from "@mui/material";
import AddReactionRoundedIcon from '@mui/icons-material/AddReactionRounded';
import { getAllPostsByUserName } from "@/services/PostService";
import PostView from "@/components/post/post-view";
import { createRandomKey } from "@/utils/RandomKeys";


export default async function UserPage({params} : any) {

    const userPosts = (await getAllPostsByUserName(params.username)).data;

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
        <Container>
            <Card
                sx={{borderRadius: 3}}
                variant="outlined">
                <Box sx={bannerStyle}/>
                <Stack direction="row" p={3}>
                    <Avatar sx={avatarStyle}>{params.username.charAt(0)}</Avatar>
                    <Box  style={{borderRadius: 30}}/>
                    <Stack gap={6} mx={2}>
                        <Stack>
                            <Typography variant="h4" fontWeight={700}>{params.username}</Typography>
                            <Stack direction="row" justifyContent="center" gap={3}>
                                <Typography>Posts     0</Typography>
                                <Typography>Comments  0</Typography>
                                <Typography>Friends   0</Typography>
                            </Stack>
                        </Stack>
                        <Button endIcon={<AddReactionRoundedIcon/>}>Follow</Button>
                    </Stack>
                </Stack>
            </Card>

            <Divider sx={{my: 5}} />
            <Typography variant="h4" my={3} fontWeight={700}>All threads posted by {params.username}</Typography>
            <Stack gap={2}>
                {
                    userPosts.map(post => 
                        <PostView 
                            key={createRandomKey()}
                            {...post}/>
                    )
                }
            </Stack>
        </Container>
    );
}