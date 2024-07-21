import PostView from "@/components/post/post-view";
import FollowButton from "@/components/shared/FollowButton";
import { UserProfileDTO } from "@/models/dto/UserProfileDTO";
import { getUserProfile } from "@/services/UserService";
import { createRandomKey } from "@/utils/RandomKeys";
import { Avatar, Box, Card, Container, Divider, Stack, Typography } from "@mui/material";

export default async function UserPage({ params }: any) {
    const userInfo: UserProfileDTO = (await getUserProfile(params.username)).data;
    const posts = userInfo.posts;

    const bannerStyle = {
        height: 150,
        backgroundImage: `url(${userInfo.banner ?? "https://images.placeholders.dev/?width=1055&height=100&text=%20&bgColor=%23757575&textColor=%757575"})`,
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
                sx={{ borderRadius: 3 }}
                variant="outlined">
                <Box sx={bannerStyle} />
                <Stack direction="row" p={3}>
                    <Avatar src={userInfo.icon} sx={avatarStyle} alt={`${userInfo.username.charAt(0)}`} />
                    <Box style={{ borderRadius: 30 }} />
                    <Stack gap={6} mx={2}>
                        <Stack>
                            <Typography variant="h4" fontWeight={700}>{userInfo.username}</Typography>
                            <Stack direction="row" justifyContent="center" gap={3}>
                                <Typography>Posts {posts?.length}</Typography>
                                <Typography>Comments  {userInfo.commentsNumber}</Typography>
                                <Typography>Friends 0</Typography>
                            </Stack>
                        </Stack>
                        <FollowButton />
                    </Stack>
                </Stack>
            </Card>

            <Divider sx={{ my: 5 }} />
            <Typography variant="h4" my={3} fontWeight={700}>All threads published by {userInfo.username}</Typography>
            <Stack gap={2}>
                {
                    posts.map(post =>
                        <PostView
                            key={createRandomKey()}
                            {...post} />
                    )
                }
            </Stack>
        </Container>
    );
}