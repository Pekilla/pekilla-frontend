"use client";

import CreateInput from "@/components/post/create-update-popup/components/create-input";
import { FormikSingleImageInput } from "@/components/shared/formik/FormikSingleImageInput";
import { AVATAR_SIZE, BANNER_SIZE } from "@/components/shared/single-image-input";
import { EditCreateCategoryDTO } from "@/models/dto/EditCreateCategoryDTO";
import { createCategory, isExists, updateCategory } from "@/services/CategoryService";
import { Button, Card, CardActions, CardContent, CardHeader, Container, Divider, Stack } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { object } from "yup";
import { notEmptyWithMaxAndMinLength } from "@/utils/ErrorSchema";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CATEGORY_ALREADY_EXISTS = "Category name already exists.";

export default function EditCreateCategoryForm(props: { category?: EditCreateCategoryDTO }) {
    const isEdit = props.category != undefined;
    const router = useRouter();
    const [usedCategoriesName, setUsedCategoriesName] = useState<string[]>([]);
    console.log(usedCategoriesName);

    return (
        <Container>
            <Formik
                initialValues={{
                    name: props.category?.name ?? "",
                    description: props.category?.description ?? "",
                    banner: props.category?.banner,
                    icon: props.category?.icon
                }}
                validationSchema={object({
                    name: notEmptyWithMaxAndMinLength(50, 5, "name").notOneOf(usedCategoriesName, "Category name already exists."),
                    description: notEmptyWithMaxAndMinLength(5000, 10, "description")
                })}
                onSubmit={async (values, formikHelpers) => {
                    // To verify that the name does not already exists if it is create.
                    if (!isEdit && (await isExists(values.name)).data) {
                        setUsedCategoriesName([...usedCategoriesName, values.name]);
                        formikHelpers.setFieldError("name", CATEGORY_ALREADY_EXISTS);
                        return;
                    }

                    
                    console.log(values.banner);
                    console.log(values.icon);

                    // Add the creatorId
                    if (isEdit) {
                        await updateCategory(values);
                    }

                    else await createCategory(values)
                    router.push(`/categories/${encodeURIComponent(values.name)}`);
                    router.refresh();
                }}
            >
                <Form>
                    <Card>
                        <CardHeader
                            title={(isEdit ? "Edit" : "Create") + " Category"}
                        />
                        <Divider />

                        <CardContent component={Stack} spacing={4} useFlexGap>
                            {!isEdit ? <Field name="name" component={CreateInput} label="Name" /> : <></>}
                            <Field name="description" component={CreateInput} label="Description" isTextArea />
                            <Field name="icon" component={FormikSingleImageInput} label="Icon" avatarSize={AVATAR_SIZE} />
                            <Field name="banner" component={FormikSingleImageInput} label="Banner" avatarSize={BANNER_SIZE} />
                        </CardContent>
                        <Divider />

                        <CardActions sx={{ float: "right" }}>
                            {isEdit ? <Button variant="outlined" onClick={() => router.push("/categories")}>Cancel</Button> : <></>}
                            <Button type="submit">{isEdit ? "Save" : "Create Category"}</Button>
                        </CardActions>
                    </Card>
                </Form>
            </Formik>
        </Container>
    );
}