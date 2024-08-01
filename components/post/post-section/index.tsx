"use client";

import CreatePopup from "@components/post/create-update-popup";
import PostView from "@components/post/post-view";
import { PostViewDTO } from "@models/dto/PostViewDTO";
import { Button, Stack, Typography } from "@mui/material";
import { createRandomKey } from "@utils/RandomKeys";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';

export function PostSection(props: { postArray: PostViewDTO[], totalPosts: number }) {
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
                    <h1>Search Results : {props.totalPosts ?? 0}</h1>
                    <Button onClick={() => setPopupState({ open: true })} endIcon={<AddIcon />}>Create </Button>
                </Stack>

                {
                    props.postArray.length == 0 ?
                        (
                            <Typography textAlign="center" variant="h5">No post were found</Typography>
                        ) : (
                            <>
                                {props.postArray?.map(post => (
                                    <PostView
                                        {...post}
                                        key={createRandomKey()}
                                        launchUpdate={(postViewDto) => setPopupState({ open: true, postViewDto })}
                                    />
                                ))}
                            </>
                        )
                }
            </Stack>
        </>
    );
}