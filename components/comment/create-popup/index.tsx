import { Box } from "@mui/material";
import CreateCommentPopupContent from "./create-input";

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