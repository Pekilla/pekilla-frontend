import { Box, Button, Modal } from "@mui/material";
import { useState } from "react";
import { CreateInput } from "./components/create-input";
import { Tags, TagsError } from "./components/tags";
import CategorySelector from "./components/category-selector";

/// props: {isOpen: boolean, setIsOpen(isOpen: boolean): void}
// Need to see select for Category
export default function CreatePopup() {
    const [isOpen, setIsOpen] = useState(true);
    const [tags, setTags] = useState<Array<string>>([]);
    const [tagsError, setTagsError] = useState<TagsError>("NONE");

    return (
        <>
            <Modal
                open={isOpen}
                keepMounted
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <Box sx={{ background: "white", width: 800, padding: 3, borderRadius: "10px" }}>
                    <div className="modal">
                        <h2>Create post</h2>
                        <CreateInput label="Title" />
                        <br /><br /><br />

                        <CreateInput label="Description" isTextArea />
                        <br /><br /><br />

                        <CategorySelector />
                        <br /><br /><br />

                        <Tags
                            addTag={(tag) => setTags([...tags, tag])}
                            deleteTag={(tag) => setTags(tags.filter(t => t !== tag))}
                            tags={tags}
                            error={tagsError}
                            setError={setTagsError}
                        />

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width : "180px", float : "right"}}>
                            <Button variant="text">Cancel</Button>
                            <Button variant="contained">Create</Button>
                        </Box>
                    </div>
                </Box>
            </Modal>
        </>
    );
}