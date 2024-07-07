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
    const postViewDtos = (await searchPosts(searchParams?.content, searchParams?.category, searchParams?.tags)).data;
    console.log(searchParams);

    return (
        <>
            <Container component={Stack} spacing={5}>
                <SearchFilters />

                <Suspense fallback={<p>Loading...</p>}>
                    <PostSection postArray={postViewDtos} />
                </Suspense>
            </Container>
        </>

    );
}