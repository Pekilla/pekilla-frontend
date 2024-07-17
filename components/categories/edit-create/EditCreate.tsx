"use client";

import { CreateInput } from "@/components/post/create-update-popup/components/create-input";
import { FormikSingleImageInput } from "@/components/shared/formik/FormikSingleImageInput";
import { AVATAR_SIZE, BANNER_SIZE } from "@/components/shared/single-image-input";
import { EditCreateCategoryDTO } from "@/models/dto/EditCreateCategoryDTO";
import { createCategory } from "@/services/CategoryService";
import { Button, Card, CardActions, CardContent, CardHeader, Container, Divider, Stack } from "@mui/material";
import { Field, Form, Formik } from "formik";
import config from "@/config.json";

export default function EditCreateCategoryForm(props: { category?: EditCreateCategoryDTO }) {
    const isEdit = props.category != undefined;

    return (
        <Container>
            <Formik
                initialValues={{
                    name: props.category?.name ?? "",
                    description: props.category?.description ?? "",
                    banner: props.category?.banner ?? null,
                    icon: props.category?.icon ?? null
                }}
                onSubmit={async (values) => {
                    let icon: File = (values.icon as any) instanceof File ? values.icon as any : undefined;
                    let banner: File = (values.banner as any) instanceof File ? values.banner as any : undefined;

                    await createCategory({ name: values.name, description: values.description, creatorId: config.id } as EditCreateCategoryDTO, banner, icon)
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
                            {isEdit ? <Button variant="outlined">Cancel</Button> : <></>}
                            <Button type="submit">{isEdit ? "Save" : "Create Category"}</Button>
                        </CardActions>
                    </Card>
                </Form>
            </Formik>
        </Container>
    );
}