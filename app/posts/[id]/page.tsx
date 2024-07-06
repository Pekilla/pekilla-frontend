import CommentSection from "@/components/comment/comment-section";
import { usePekillaContext } from "@/components/PekillaContext";
import PostView from "@/components/post/post-view";
import { getPostById } from "@/services/PostService";
import { Container } from "@mui/material";

const SpecificPostPage = async ({params} : any) => {
    const post = await getPostById(params.id);


    return (
        <Container>
            {/* The post */}
            <PostView {...post}/>

            {/* The Comment Section */}

            <CommentSection postId={post.id}/>
        </Container>
    );
}
export default SpecificPostPage;