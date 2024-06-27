/**
 * FROM Opensell with Modification.
 */

import { ReactElement } from "react";
import { TextField } from "@mui/material";
import { createRandomKey } from "../../../../util/RandomKeys";

export type TagsError =
    "NONE" |
    "Tag cannot be empty" |
    "Tag already exists"
;

export default function TagPart({ label = "", onDoubleClick = () => { } }) {
    return (
        <button
            style={{ fontSize: "16px" }}
            onDoubleClick={onDoubleClick}
            type="button"
        >
            {label}
        </button>
    );
}

interface TagsProps {
    error: TagsError;
    setError(error: TagsError): void;
    tags: Array<string>;
    deleteTag(tag: string): void;
    addTag(tag: string): void;
};


export function Tags(props: TagsProps): ReactElement {
    const addEvent = (e: any, tag: string): void => {
        let addError: TagsError = "NONE";

        // Check for error
        if (!tag) addError = "Tag cannot be empty";
        else if (props.tags.includes(tag)) addError = "Tag already exists";

        // if error and error is not already their.
        if (addError !== "NONE") {
            if(addError != props.error) props.setError(addError);
        } else {
            props.addTag(tag);
            if (props.error !== "NONE") props.setError("NONE");
        }

        e.target.value = "";
    };

    const onTypeEvent = (e: any): void => {
        let nTarget = (e.target.value)
            .toLowerCase()
            .replaceAll(' ', '-')
            .replaceAll('--', '-')
            .trim()
            ;

        // To do not let a user but a - at index 0
        if (nTarget[0] == '-' && nTarget.length == 1) {
            e.target.value = "";
        }

        else e.target.value = nTarget;
    }


    const deleteEvent = (tag: string): void => {
        props.deleteTag(tag);

        if (props.error != "NONE") {
            props.setError("NONE");
        }
    }

    return (
        <>
            <TextField
                label={"Tags"}
                variant={"filled"}
                onChange={onTypeEvent}
                type="text"
                error={props.error != "NONE"}
                helperText={props.error == "NONE" ? "" : props.error}
                onDoubleClick={(e: any) => addEvent(e, e.target.value)} name="tags"
            />

            <div>
                <br />

                {props.tags?.map(value => (
                    <TagPart label={value} onDoubleClick={() => deleteEvent(value)} key={createRandomKey()} />
                ))}
            </div>
        </>
    );
}