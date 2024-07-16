"use client";

import { CreateInput } from "@/components/post/create-update-popup/components/create-input";
import { FormikSingleImageInput } from "@/components/shared/formik/FormikSingleImageInput";
import { AVATAR_SIZE, BANNER_SIZE } from "@/components/shared/single-image-input";
import { Field, Form, Formik } from "formik";

export default function EditCreateCategoryForm(props: {category?: EditCreateCategoryDTO}) {
    const isEdit = props.category != undefined;

    return (
        <Formik
            e
            initialValues={{
                name: props.category?.name ?? "",
                description: props.category?.description ?? "",
                banner: props.category?.banner ?? "",
                icon: props.category?.icon ?? ""
            }}
            onSubmit={(values) => { 
                console.log(values);
            }}
        >
            <Form>
                <Field name="name" component={CreateInput} label="Name" />
                <Field name="description" component={CreateInput} label="Description" />
                <Field name="banner" component={FormikSingleImageInput} label="Banner" avatarSize={AVATAR_SIZE} />
                <Field name="icon" component={FormikSingleImageInput} label="Icon" avatarSize={BANNER_SIZE} />
            </Form>
        </Formik>
    );
}