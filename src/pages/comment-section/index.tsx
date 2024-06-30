import { List } from "@mui/material";
import React, { useEffect } from "react";
import CommentView from "../../components/comment/comment-view";
import { CommentViewDTO } from "../../model/dto/CommentViewDTO";
import { getAllComments } from "../../services/CommentService";
import { createRandomKey } from "../../util/RandomKeys";

const CommentSection = () => {

    let [comments, setComments] = React.useState<CommentViewDTO[]>();

    useEffect(() => {
        getAllComments(1).then(res => {
            setComments(res.data ?? null);
        })
    }, []);
    
    return (
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
    )
}
export default CommentSection;