import CommentTextArea from "@/components/comment/comment-textarea";
import CommentView from "@/components/comment/comment-view";
import PostView from "@/components/post/post-view";
import { getAllComments, getPostById } from "@/services/PostService";
import { createRandomKey } from "@/utils/RandomKeys";
import { Container, List } from "@mui/material";

const SpecificPostPage = async ({params} : any) => {
    const post = (await getPostById(params.id)).data;
    const comments = (await getAllComments(params.id)).data;

    return (
        <Container>
            <PostView {...post}/>

            <CommentTextArea postId={post.id}/>
            <List>
                {
                    comments?.map(comment => (
                        <CommentView
                            key={createRandomKey()} 
                            {...comment}
                        />
                    ))
                }
            </List>
        </Container>
    );
}
export default SpecificPostPage;