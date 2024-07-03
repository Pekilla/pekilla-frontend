import PostCardView from "@/components/post/card-view";
import { getAllPostsThatContain } from "@/services/PostService";
import { Stack, Typography } from "@mui/material";
import Image from "next/image";

export interface PostSearchProps {
    params: {
        content: string
    }
}

export default async function PostSearch({ params }: PostSearchProps) {
    const postViewDtos = (await getAllPostsThatContain(params.content)).data;

    return (
        <Stack display="flex" justifyContent="center" alignItems="center" spacing={2}>
            {postViewDtos.length == 0 ?
                (
                    <>
                        <Typography variant="h4" fontFamily="monospace">No post were found</Typography>
                        <Image src="/not-found.webp" alt="not-found" width={1238.4} height={826.56} />
                    </>
                ) : (
                    <>
                        {postViewDtos.map(post => (
                            <PostCardView
                                {...post}
                            />
                        ))}
                    </>
                )

            }
        </Stack>
    );
}