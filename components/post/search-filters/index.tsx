"use client";

import { getAListFromParam } from "@/utils/utils";
import CategorySelector from "@components/shared/selector/CategorySelector";
import { Button, Stack } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { CreateInput } from "../create-update-popup/components/create-input";
import { Tags } from "../create-update-popup/components/tags";
import SortedSelector from "./components/sorted-selector";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function SearchFilters() {
    const params = useSearchParams();
    const router = useRouter();

    const initialValues = {
        content: params.get("content") ?? "",
        category: params.get("category") ?? "",
        sortedBy: params.get("sortedBy") ?? 0,
        tags: params.get("tags") ? getAListFromParam(params.get("tags")) : []
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
                console.log(values);
            }}
        >
            <Form>
                <Stack spacing={2}>
                    <h2>Filters</h2>

                    <Stack direction="row" spacing={2}>
                        <Field name="content" component={CreateInput} label="Content" />
                        <Field name="category" component={CategorySelector} />
                        <Field name="sortedBy" component={SortedSelector} />
                    </Stack>

                    <Field name="tags" component={Tags} label="Tags" />

                    <Stack direction="row" justifyContent="space-between">
                        <Button>Clear filter</Button>
                        <Button>Apply filter</Button>
                    </Stack>
                </Stack>
            </Form>
        </Formik>
    );
}