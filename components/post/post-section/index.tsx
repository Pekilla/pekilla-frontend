"use client"

import CreatePopup from "@components/post/create-update-popup";
import PostView from "@components/post/post-view";
import { PostViewDTO } from "@models/dto/PostViewDTO";
import { Button, Container, Stack } from "@mui/material";
import { createRandomKey } from "@utils/RandomKeys";
import { useState } from "react";

export function PostSection(props: { postArray: PostViewDTO[] }) {
    const [popupState, setPopupState] = useState<{ open: boolean, postViewDto?: PostViewDTO }>({ open: false });

    return (
        <Container>
            <CreatePopup
                open={popupState.open}
                reset={() => setPopupState({ open: false })}
                postViewDto={popupState.postViewDto}
            />

            <Button variant="contained" onClick={() => setPopupState({ open: true })}>Create</Button>

            <Stack spacing={2}>
                {props.postArray?.map(post => (
                    <PostView
                        {...post}
                        key={createRandomKey()}
                        launchUpdate={(postViewDto) => setPopupState({ open: true, postViewDto })}
                    />
                ))}
            </Stack>
        </Container>
    );
}