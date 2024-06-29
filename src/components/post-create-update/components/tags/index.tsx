/**
 * FROM Opensell with Modification.
 */

import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import { Autocomplete, Chip, TextField } from "@mui/material";
import { Field, FieldArray } from "formik";
import { ReactElement, useState } from "react";
import { MUI_INPUT_VARIANT } from "../../../../App";
import { createRandomKey } from "../../../../util/RandomKeys";
import { IconLabel } from "../../../shared/icon-label";

export default function TagPart({ label = "", onDoubleClick = () => { } }) {
    return (
        <Chip
            sx={{ fontSize: "16px" }}
            onDelete={onDoubleClick}
            label={label}
        />
    );
}

interface TagsProps {
    error: string;
    tags: Array<string>;
};


export function Tags(props: TagsProps): ReactElement {
    const [tags, setTags] = useState<string[]>([]);
    const [error, setError] = useState("");

    const handleChange = (e: any): void => {
        let tmpTag = (e.target.value).toLowerCase().replaceAll(' ', '-').replaceAll('--', '-').trim();

        // To do not let a user but a - at index 0
        if (tmpTag[0] == '-' && tmpTag.length == 1) {
            e.target.value = "";
        }

        else e.target.value = tmpTag;

        if(tags.includes(e.target.value)) { 
            if(!error) setError("Tag already exists.");
        } else if(!!error) setError("");
    }

    const addEvent = (e: any, push: any): void => {
        if (!props.error) {
            push(e.target.value);
            e.target.value = "";
        }
    };

    return (
        <>
            <Autocomplete
                multiple
                options={[]}
                freeSolo
                onChange={(e, currentTags) => {
                    if(tags != currentTags) setTags(currentTags);
                    if(!!error) setError("")
                }}
                value={tags}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant={MUI_INPUT_VARIANT}
                        onChange={handleChange}
                        error={!!error}
                        helperText={error}
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