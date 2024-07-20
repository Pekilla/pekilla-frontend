import PostView from "@/components/post/post-view";
import { PostViewDTO } from "@/models/dto/PostViewDTO";
import { searchPosts } from "@/services/PostService";
import { createRandomKey } from "@/utils/RandomKeys";
import { avatarStyle, bannerStyle } from "@/utils/static";
import { Avatar, Box, Container, Divider, Stack, Typography } from "@mui/material";

export default async function CategoryPage({params} : any) {
    const postsFromCategory : PostViewDTO[] = (await searchPosts(undefined,params.name,undefined)).data;

    return (
        <>
            <Box sx={bannerStyle}/>
            <Container >
                <Stack direction="row" alignItems="end"  my={5}>
                    <Avatar sx={avatarStyle}>
                        {params.name.charAt(0)}
                    </Avatar>
                    <Typography ml={2} variant="h2" fontWeight={700}>
                        {params.name}
                    </Typography>
                </Stack>
                <Divider sx={{marginY: 5}}/>

                <Stack gap={2}>
                    {
                        /* All post in this category  */
                        postsFromCategory.map(post => 
                            <PostView  
                                key={createRandomKey()}
                                {...post}/>
                        )
                    }
                </Stack>

            </Container>
        </>
    )    
}