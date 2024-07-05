import PostView from "@/components/post/post-view";
import { searchPosts } from "@/services/PostService";
import { createRandomKey } from "@/utils/RandomKeys";
import { Stack, Typography } from "@mui/material";
import Image from "next/image";

export interface PostSearchProps {
    searchParams: {
        content: string,
        category: string,
        tags: string[]
    }
}

export default async function PostSearch({ searchParams }: PostSearchProps) {
    const postViewDtos = (await searchPosts(searchParams.content, searchParams.category, searchParams.tags)).data;

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
                            <PostView
                                key={createRandomKey()}
                                {...post}
                            />
                        ))}
                    </>
                )

            }
        </Stack>
    );
}