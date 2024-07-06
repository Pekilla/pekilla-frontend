import { PostSection } from "@/components/post/post-section";
import SearchFilters from "@/components/post/search-filters";
import { searchPosts } from "@/services/PostService";
import { Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { Suspense } from "react";

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
        <>
            <Container component={Stack} spacing={5}>
                <SearchFilters {...searchParams} />
                
                {
                    postViewDtos.length == 0 ?
                        (
                            <Stack spacing={2}>
                                <Typography textAlign="center" variant="h4" fontFamily="monospace">No post were found</Typography>
                                <Image src="/not-found.webp" alt="not-found" width={1238.4} height={826.56} />
                            </Stack>
                        ) : (
                            <Suspense fallback={<p>Loading...</p>}>
                                <PostSection postArray={postViewDtos} />
                            </Suspense>

                        )
                }
            </Container>
        </>

    );
}