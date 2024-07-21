import CommentTextArea from "@/components/comment/comment-textarea";
import CommentView from "@/components/comment/comment-view";
import PostView from "@/components/post/post-view";
import { CommentViewDTO } from "@/models/dto/CommentViewDTO";
import { getPostFullView } from "@/services/PostService";
import { createRandomKey } from "@/utils/RandomKeys";
import { Container, List } from "@mui/material";

export default async function SpecificPostPage({ params }: any) {
    const postFullView = (await getPostFullView(params.id)).data;
    const post = postFullView.post;
    const comments: CommentViewDTO[] = postFullView.comments;

    return (
        <Container>
            <PostView {...post} />

            <CommentTextArea postId={post.id} />
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