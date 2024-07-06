"use client";

import { Field, Form, Formik } from "formik";
import { CreateInput } from "../create-update-popup/components/create-input";
import CategorySelector from "@components/shared/selector/CategorySelector";
import { Tags } from "../create-update-popup/components/tags";
import { Category } from "@/models/enums/Category";

export default function SearchFilters() {
    const initialValues = {
        category : Category.OTHER
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
                console.log(values);
            }}
        >
            <Form>
                <Field name="content" component={CreateInput} label="Content" />
                <Field name="category" component={CategorySelector} />
                <Field name="tags" component={Tags} label="Tags" />
            </Form>
        </Formik>
    );
}