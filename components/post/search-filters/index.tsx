"use client";

import { Field, Form, Formik } from "formik";
import { CreateInput } from "../create-update-popup/components/create-input";
import CategorySelector from "../create-update-popup/components/category-selector";
import { Tags } from "../create-update-popup/components/tags";

export default function SearchFilters() {
    const initialValues = {

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
                <Field name="category" component={CategorySelector} label="Category" />
                <Field name="tags" component={Tags} label="Tags" />
            </Form>
        </Formik>
    );
}