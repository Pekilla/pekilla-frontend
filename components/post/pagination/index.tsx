"use client";

import { getCorrectPage } from "@/models/dto/Page";
import { Pagination, Stack } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchPagination(props: { totalPages: number }) {
    const params = useSearchParams();
    const router = useRouter();
    const [pageNumber, setPageNumber] = useState(getCorrectPage(Number(params.get("page"))));

    useEffect(() => {
        let tmpPage = getCorrectPage(Number(params.get("page")));
        if (tmpPage != pageNumber) setPageNumber(tmpPage);
    }, [params]);

    return (
        <Stack alignItems="center" padding={5}>
            {props.totalPages > 0 ?
                (
                    <Pagination page={pageNumber} count={props.totalPages} onChange={(e, page) => {
                        const tmpParams = new URLSearchParams(params);
                        tmpParams.set("page", `${page}`);
                        router.push("?" + tmpParams);
                    }} />
                ) : (
                    <></>
                )
            }
        </Stack>
    );
}