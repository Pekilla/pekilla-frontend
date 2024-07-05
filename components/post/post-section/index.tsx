"use client"

import { Button, Container, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import CreatePopup from "@components/post/create-update-popup";
import PostView from "@components/post/post-view";
import { PostViewDTO } from "@models/dto/PostViewDTO";
import { getAllPost } from "@services/PostService";
import { createRandomKey } from "@utils/RandomKeys";

export function PostSection() {
    const [postArray, setPostArray] = useState<PostViewDTO[]>([]);
    const [postPopup, setPostPopup] = useState<{isOpen: boolean, isUpdate: boolean, postViewDto?: PostViewDTO}>(
        {
            isOpen: false,
            isUpdate : false,
        }
    );

    const setIsOpen = (open: boolean) => {
        setPostPopup({...postPopup, isOpen : open});
    };

    const reset = () => {
        setPostPopup({isOpen: false, isUpdate: false, postViewDto: undefined});
    };
    
    const updateDto = (currentDto: PostViewDTO, isCreate?: boolean) => {
        if(isCreate) {
            setPostArray([currentDto, ...postArray]);
        } else {
            // Add the new dto, and remove the old one by it id.
            setPostArray([currentDto, ...postArray.filter(dto => dto.id !== currentDto.id)]);
        }
    };

    useEffect(() => {
        getAllPost().then(res => {
            if (res?.data) setPostArray(res?.data);
        });
    }, []);

    return (
        <Container>
            <CreatePopup
                isUpdate={postPopup.isUpdate}
                open={postPopup.isOpen}
                reset={reset}
                postViewDto={postPopup.postViewDto}
                updateDto={updateDto}
            />
            
            <Button variant="contained" onClick={() => setIsOpen(true)}>Create</Button>

            <Stack spacing={2}>
                {postArray?.map(
                    post => (
                        <PostView
                            {...post}
                            removePostFromUi={(postId) => setPostArray(postArray.filter(post => post.id !== postId))}
                            key={createRandomKey()}
                            launchUpdate={(postViewDto) => setPostPopup({isOpen : true, isUpdate : true, postViewDto})}
                        />
                    )
                )}
            </Stack>
        </Container>
    );
}