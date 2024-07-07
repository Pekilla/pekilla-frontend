"use client";

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
        category: params.get("category") ?? searchParamDefaults.category,
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
    const router = useRouter();
    const formikContext = useFormikContext<any>();
    const [lastValues, setLastValues] = useState(formikContext.values);

    useEffect(() => {
        formikContext.setValues(getParams(new URLSearchParams(props.params)));
    }, [props.params]);

    const reset = () => {
        router.push("?content=");
        setLastValues(searchParamDefaults);
        formikContext.setValues(searchParamDefaults);
    };

    const submit = () => {
        let query = qs.stringify(formikContext.values, { arrayFormat: "repeat", filter : filterFunc});
        
        if(query.length == 0) router.push("?content=");
        else router.push(`?${query}`);

        setLastValues(formikContext.values);
    };

    return (
        <Stack spacing={2}>
            <h2>Filters</h2>

            <Stack direction="row" spacing={2}>
                <Field name="content" component={CreateInput} label="Content" />
                <Field name="category" component={CategorySelector} isFilter />
                {/* <Field name="sortedBy" component={SortedSelector} /> */}
            </Stack>

            <Field name="tags" component={Tags} label="Tags" />

            <Stack direction="row" justifyContent="space-between">
                <Button disabled={(props.params.size == 0 || props.params.get("content") == "") && equals(searchParamDefaults, formikContext.values)} onClick={() => { reset(); }}>Clear filter</Button>
                <Button disabled={equals(lastValues, formikContext.values) || (equals(searchParamDefaults, formikContext.values) && formikContext.values.category == lastValues.category)} onClick={submit}>Apply filter</Button>
            </Stack>
        </Stack>
    );
}