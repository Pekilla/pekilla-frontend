"use client";

import { equals, filterFunc } from "@/utils/utils";
import CategorySelector from "@components/shared/selector/CategorySelector";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ClearIcon from '@mui/icons-material/Clear';
import { Button, Stack } from "@mui/material";
import { Field, Form, FormikProvider, useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "qs";
import { useEffect, useState } from "react";
import { CreateInput } from "../create-update-popup/components/create-input";
import { Tags } from "../create-update-popup/components/tags";

const searchParamDefaults = {
    content: "",
    category: "",
    sortedBy: "",
    tags: []
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
    const router = useRouter();

    const formik = useFormik({
        initialValues: getParams(params),
        onSubmit: (values) => {
            let query = qs.stringify(formik.values, { arrayFormat: "repeat", filter: filterFunc });

            if (query.length == 0) router.push("?content=");
            else router.push(`?${query}`);

            setLastValues(formik.values);
        }
    });

    const [lastValues, setLastValues] = useState(formik.values);
    
    const reset = () => {
        router.push("?content=");
        setLastValues(searchParamDefaults);
        formik.setValues(searchParamDefaults);
    };

    useEffect(() => {
        formik.setValues(getParams(new URLSearchParams(params)));
    }, [params]);

    return (
        <FormikProvider value={formik}>
            <Form>
                <Stack spacing={2}>
                    <h1>
                        Filters
                        <AutoAwesomeIcon color="primary" />
                    </h1>

                    <Stack direction="row" spacing={2}>
                        <Field name="content" component={CreateInput} label="Content" />
                        <Field name="category" component={CategorySelector} isFilter />
                        {/* <Field name="sortedBy" component={SortedSelector} /> */}
                    </Stack>

                    <Field name="tags" component={Tags} label="Tags" />

                    <Stack direction="row" justifyContent="space-between">
                        <Button disabled={(params.size == 0 || params.get("content") == "") && equals(searchParamDefaults, formik.values)} onClick={() => { reset(); }} endIcon={<ClearIcon />}>Clear filter</Button>
                        <Button type="submit" disabled={equals(lastValues, formik.values) || (equals(searchParamDefaults, formik.values) && formik.values.category == lastValues.category)}>Apply filter</Button>
                    </Stack>
                </Stack>
            </Form>
        </FormikProvider>
    );
}