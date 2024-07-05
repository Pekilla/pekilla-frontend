import CommentSection from "@/app/comments/components/comment-section";
import PostView from "@/components/post/post-view";
import { getPostById } from "@/services/PostService";
import { createRandomKey } from "@/utils/RandomKeys";
import { Avatar, Box, Card, Chip, Container, Stack, Typography } from "@mui/material";
import { Montserrat } from "next/font/google";

const SpecificPostPage = async ({params} : any) => {

    const post = await getPostById(params.id);

    const boxStyle = {
        p:2, 
        border: '1px solid black',
        
    }

    return (
        <Container>
            {/* The post */}
            <PostView {...post}/>

            {/* The Comment Section */}

            <CommentSection id={post.id}/>
        </Container>
    );
}
export default SpecificPostPage;