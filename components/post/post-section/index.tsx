"use client";

import CreatePopup from "@components/post/create-update-popup";
import PostView from "@components/post/post-view";
import { PostViewDTO } from "@models/dto/PostViewDTO";
import { Button, Container, Stack } from "@mui/material";
import { createRandomKey } from "@utils/RandomKeys";
import { useState } from "react";
import SearchFilters from "../search-filters";

export function PostSection(props: { postArray: PostViewDTO[] }) {
    const [popupState, setPopupState] = useState<{ open: boolean, postViewDto?: PostViewDTO }>({ open: false });

    return (
        <>
            <CreatePopup
                open={popupState.open}
                reset={() => setPopupState({ open: false })}
                postViewDto={popupState.postViewDto}
            />


            <Stack spacing={2}>
                <Stack direction="row" justifyContent="space-between">
                    <h2>Search Results</h2>
                    <Button onClick={() => setPopupState({ open: true })}>Create</Button>
                </Stack>

                {props.postArray?.map(post => (
                    <PostView
                        {...post}
                        key={createRandomKey()}
                        launchUpdate={(postViewDto) => setPopupState({ open: true, postViewDto })}
                    />
                ))}
            </Stack>
        </>
    );
}