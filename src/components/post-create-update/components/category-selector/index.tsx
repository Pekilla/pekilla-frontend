import { MenuItem, TextField } from '@mui/material';
import { useState } from 'react';
import { IconLabel } from '../../../shared/icon-label';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { MUI_INPUT_VARIANT } from '../../../../App';

export const CATEGORIES = [
    "OTHER",
    "GAME",
    "ANIME",
    "DRAWING",
    "PROGRAMMING"
];

export default function CategorySelector() {
    const [value, setValue] = useState(CATEGORIES[3]);

    return (
        <>
            <TextField
                label={
                    <IconLabel iconProp={faList} title="Category" />
                }
                value={value}
                onChange={(e) => setValue(e.target.value)}
                variant={MUI_INPUT_VARIANT}
                sx={{
                    width: 200
                }}
                select
            >
                {CATEGORIES.map(
                    category => (
                        <MenuItem value={category}>{category.toLowerCase()}</MenuItem>
                    )
                )}
            </TextField>
        </>
    );
}