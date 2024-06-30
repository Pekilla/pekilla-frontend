import { List } from "@mui/material";
import React, { useEffect } from "react";
import CommentView from "../../components/comment/comment-view";
import { getAllComments } from "../../services/CommentService";
import { createRandomKey } from "../../util/RandomKeys";
import { CommentDTO } from "../../model/dto/CommentDTO";

const CommentSection = () => {

    let [comments, setComments] = React.useState<CommentDTO[]>();

    useEffect(() => {
        getAllComments(1).then(res => {
            setComments(res.data);
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