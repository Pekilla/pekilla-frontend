import { Avatar, Box, Button, Card, Container, Divider, Stack, Typography } from "@mui/material";
import AddReactionRoundedIcon from '@mui/icons-material/AddReactionRounded';
import { getAllPostsByUserName } from "@/services/PostService";
import PostView from "@/components/post/post-view";
import { createRandomKey } from "@/utils/RandomKeys";
import { getUserInfoByUserName } from "@/services/UserService";



export default async function UserPage({params} : any) {

    const userPosts = (await getAllPostsByUserName(params.username)).data;
    const userInfo = (await getUserInfoByUserName(params.username)).data;

    const bannerStyle = {
        height: 150,
        backgroundImage: `url(${userInfo.banner})`,
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
                    <Avatar src={`${userInfo.icon}`} sx={avatarStyle} alt={`${userInfo.username.charAt(0)}`}/>
                    <Box  style={{borderRadius: 30}}/>
                    <Stack gap={6} mx={2}>
                        <Stack>
                            <Typography variant="h4" fontWeight={700}>{userInfo.username}</Typography>
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
            <Typography variant="h4" my={3} fontWeight={700}>All threads published by {userInfo.username}</Typography>
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