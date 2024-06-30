import { useEffect, useState } from "react";
import PostCardView from "../../components/post/card-view";
import CreatePopup from "../../components/post/create-update-popup";
import { Category } from "../../model/enums/Category";
import { getAllPost } from "../../services/PostService";
import { PostViewDTO } from "../../model/dto/PostViewDTO";
import { Stack } from "@mui/material";

export function PostSection() {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [postArray, setPostArray] = useState<PostViewDTO[]>([]);

    useEffect(() => {
        getAllPost().then(res => {
            if (res?.data) setPostArray(res?.data);
        });
    }, []);

    return (
        <>
            <CreatePopup isUpdate isOpen={isUpdateOpen} setIsOpen={setIsUpdateOpen} />
            <CreatePopup isOpen={isCreateOpen} setIsOpen={setIsCreateOpen} />
            <button onClick={() => setIsCreateOpen(true)}>Create</button>
            <button onClick={() => setIsUpdateOpen(true)}>Update</button>

            <br /><br /><br />

            <Stack justifyContent="center" alignItems="center">
                {postArray.map(
                    post => (
                        <PostCardView
                            {...post}
                        />
                    )
                )}
            </Stack>
        </>
    );
}