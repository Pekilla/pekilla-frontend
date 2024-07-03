"use client"

/**
 * FROM Opensell with Modification.
 */

import { Autocomplete, TextField } from "@mui/material";
import { ErrorMessage, FieldProps } from "formik";
import { ReactElement } from "react";
import { MUI_INPUT_VARIANT } from "@utils/utils";
import IconLabel from "@/components/shared/IconLabel";
import TagIcon from '@mui/icons-material/Tag';

interface TagsProps extends FieldProps {
    tags: string[];
    setTags(tags: string[]): void;
};

export enum TagsErrors {
    EXISTS = "Tag already exists",
    SIZE = "Need to have at least 3 tags."
}


export function Tags(props: TagsProps): ReactElement {
    return (
        <>
            <Autocomplete
                multiple
                options={[]}
                freeSolo
                onChange={(e, currentTags) => {
                    if (props.tags != currentTags) props.setTags(currentTags);
                }}
                value={props.tags}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant={MUI_INPUT_VARIANT}
                        {...props.field}
                        onChange={() => {}}
                        error={(props.form.errors["tags"] && Boolean(props.form.touched["tags"])) as boolean}
                        helperText={<ErrorMessage name="tags" />}
                        label={
                            <IconLabel label="Tags" icon={<TagIcon />} />
                        }
                        placeholder="Add a tag..."
                    />
                )}
            />

        </>
    );
}