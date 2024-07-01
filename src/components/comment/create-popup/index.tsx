import { Box, Typography } from "@mui/material";
import React from "react";
import CreateCommentPopupContent from "./create-input";
import { CommentDTO } from "../../../model/dto/CommentDTO";

const CreateCommentPopup = () => {

    var style = {
        position: 'absolute' as 'absolute',
        bgcolor: 'background.paper',
        padding: '20px'
    }

    return (
        <Box
            sx={style}>
            <CreateCommentPopupContent />
        </Box>
    )
}
export default CreateCommentPopup;