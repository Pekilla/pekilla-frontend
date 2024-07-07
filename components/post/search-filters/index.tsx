"use client";

import { CATEGORIES, Category } from "@/models/enums/Category";
import { equals, filterFunc } from "@/utils/utils";
import CategorySelector from "@components/shared/selector/CategorySelector";
import { Button, Stack } from "@mui/material";
import { Field, Form, Formik, useFormikContext } from "formik";
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "qs";
import { useEffect, useState } from "react";
import { CreateInput } from "../create-update-popup/components/create-input";
import { Tags } from "../create-update-popup/components/tags";
import SortedSelector from "./components/sorted-selector";

const searchParamDefaults = {
    content : "",
    category : "",
    sortedBy : "",
    tags : []
};

function getParams(params: URLSearchParams) {
    return {
        content: params.get("content") ?? searchParamDefaults.content,
        category: CATEGORIES.find((e: Category) => e == params.get("category") as string) ?? searchParamDefaults.category,
        sortedBy: params.get("sortedBy") ?? searchParamDefaults.sortedBy,
        tags: params.getAll("tags") ?? searchParamDefaults.tags
    };
}

export default function SearchForm() {
    const params = useSearchParams();

    return (
        <Formik
            initialValues={getParams(params)}
            onSubmit={(values) => {
                console.log(values);
            }}
        >
            <Form>
                <SearchFilters params={params} />
            </Form>
        </Formik>
    );
}

function SearchFilters(props: { params: ReadonlyURLSearchParams }) {
    const pathname = usePathname();
    const router = useRouter();
    const formikContext = useFormikContext<any>();
    const [lastValues, setLastValues] = useState(formikContext.values);

    useEffect(() => {
        formikContext.setValues(getParams(new URLSearchParams(props.params)));
    }, [props.params]);

    const reset = () => {
        if (props.params.size != 0) {
            router.push(`${pathname}`);
        } else {
            formikContext.setValues(searchParamDefaults);
        }

        setLastValues(searchParamDefaults);
        formikContext.resetForm();
    };

    const submit = () => {
        router.push(`?${qs.stringify(formikContext.values, { arrayFormat: "repeat", filter : filterFunc})}`);
        setLastValues(formikContext.values);
        formikContext.resetForm();
    };

    return (
        <Stack spacing={2}>
            <h2>Filters</h2>

            <Stack direction="row" spacing={2}>
                <Field name="content" component={CreateInput} label="Content" />
                <Field name="category" component={CategorySelector} />
                <Field name="sortedBy" component={SortedSelector} />
            </Stack>

            <Field name="tags" component={Tags} label="Tags" />

            <Stack direction="row" justifyContent="space-between">
                <Button disabled={equals(searchParamDefaults, formikContext.values)} onClick={() => { reset(); }}>Clear filter</Button>
                <Button disabled={equals(lastValues, formikContext.values)} onClick={submit}>Apply filter</Button>
            </Stack>
        </Stack>
    );
}