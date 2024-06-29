/**
 * FROM Opensell with Modification.
 */

import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import { Autocomplete, TextField } from "@mui/material";
import { ReactElement } from "react";
import { MUI_INPUT_VARIANT } from "../../../../App";
import { IconLabel } from "../../../shared/icon-label";
import { ErrorMessage, FieldProps } from "formik";

interface TagsProps extends FieldProps {
    setError(error: string): void;
    tags: string[];
    setTags(tags: string[]): void;
};

export function Tags(props: TagsProps): ReactElement {
    const error = props.form.errors.tags;

    const handleChange = (e: any): void => {
        if (props.tags.includes(e.target.value)) props.setError("Tag already exists.");
        else if (error == "Tag already exists.") props.setError("");
    };

    return (
        <>
            <Autocomplete
                multiple
                options={[]}
                freeSolo
                onChange={(e, currentTags) => {
                    if (props.tags != currentTags) props.setTags(currentTags);
                    if (error == "Tag already exists.") props.setError("");
                }}
                value={props.tags}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant={MUI_INPUT_VARIANT}
                        {...props.field}
                        onChange={handleChange}
                        error={(props.form.errors["tags"] && Boolean(props.form.touched["tags"])) as boolean}
                        helperText={<ErrorMessage name="tags" />}
                        label={
                            <IconLabel iconProp={faHashtag} title="Tags" />
                        }
                        placeholder="Add a tag..."
                    />
                )}
            />

        </>
    );
}