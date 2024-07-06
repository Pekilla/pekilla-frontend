"use client";

/**
 * FROM Opensell with Modification.
 */

import IconLabel from "@/components/shared/IconLabel";
import TagIcon from '@mui/icons-material/Tag';
import { Autocomplete, TextField } from "@mui/material";
import { ErrorMessage, FieldProps } from "formik";
import { ReactElement } from "react";

export function Tags(props: FieldProps): ReactElement {
    const { name, value } = props.field;
    const { setFieldValue, errors, touched } = props.form;

    return (
        <Autocomplete
            multiple
            options={[]}
            freeSolo
            onChange={(e, currentTags) => {
                if (value != currentTags) setFieldValue(name, currentTags);
            }}
            value={value}
            renderInput={(params) => (
                <TextField
                    {...params}
                    {...props.field}
                    onChange={() => { }}
                    error={(errors[name] && Boolean(touched[name])) as boolean}
                    helperText={<ErrorMessage name={name} />}
                    label={
                        <IconLabel label="Tags" icon={<TagIcon />} />
                    }
                    placeholder="Add a tag..."
                />
            )}
        />
    );
}