import SearchPagination from "@/components/post/pagination";
import { PostSection } from "@/components/post/post-section";
import SearchFilters from "@/components/post/search-filters";
import { getCorrectPage } from "@/models/dto/Page";
import { searchPosts } from "@/services/PostService";
import { Container, Pagination, Stack, Typography } from "@mui/material";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export interface PostSearchProps {
    searchParams: {
        content?: string,
        category?: string,
        tags?: string[],
        page?: number
    }
}

export default async function PostSearch({ searchParams }: PostSearchProps) {
    const postViewDtos = (await searchPosts(searchParams?.content, searchParams?.category, searchParams?.tags, searchParams?.page)).data;
    const page = getCorrectPage(searchParams.page);

    return (
        <Container component={Stack} spacing={5}>
            <SearchFilters />

            <Suspense fallback={<p>Loading...</p>}>
                {searchParams.page != undefined && searchParams.page != 1 && searchParams.page > postViewDtos.page.totalPages ?
                    (
                        <Typography variant="h4" textAlign="center">Invalid page number</Typography>
                    ) : (
                        <PostSection postArray={postViewDtos.content} totalPosts={postViewDtos.page.totalElements} />
                    )
                }

                <SearchPagination totalPages={postViewDtos.page.totalPages} />
            </Suspense>
        </Container>
    );
}