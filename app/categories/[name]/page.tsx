import PostView from "@/components/post/post-view";
import { PostViewDTO } from "@/models/dto/PostViewDTO";
import { searchPosts } from "@/services/PostService";
import { createRandomKey } from "@/utils/RandomKeys";
import { Avatar, Box, Button, Card, CardMedia, Container, Divider, Paper, Skeleton, Stack, Typography } from "@mui/material";

export default async function CategoryPage({params} : any) {

    const containerStyle = {
        width: 150, height: 150,
    }

    const bannerStyle = {
        height: 250,
        backgroundImage: "url('https://images-ext-1.discordapp.net/external/-AYFgaaFCTDgYkeFlJjtwFK79woW647ech2hlPPXlDk/%3Fw%3D650/https/www.indiewire.com/wp-content/uploads/2016/08/big-totoro-e1538413562225.jpeg?format=webp')",
        backgroundPosition: "center",
        backgroundSize: "cover"
    }

    const postsFromCategory : PostViewDTO[] = (await searchPosts("",params.name,[])).data;

    return (
        <>
            <Box sx={bannerStyle}/>
            <Container >
                <Stack direction="row" alignItems="end"  my={5}>
                    <Avatar 
                        sx={containerStyle}
                        variant="square">
                        
                    </Avatar>
                    <Typography ml={2} variant="h2">
                        {params.name}
                    </Typography>
                </Stack>
                <Divider/>

                <Stack gap={5}>
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