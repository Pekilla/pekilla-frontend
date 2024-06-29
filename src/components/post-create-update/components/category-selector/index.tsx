import { MenuItem, TextField } from '@mui/material';
import { useState } from 'react';
import { IconLabel } from '../../../shared/icon-label';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { MUI_INPUT_VARIANT } from '../../../../App';
import { createRandomKey } from '../../../../util/RandomKeys';

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
                defaultValue={CATEGORIES[0]}
                onChange={(e) => setValue(e.target.value)}
                variant={MUI_INPUT_VARIANT}
                sx={{
                    width: 200
                }}
                name="category"
                select
            >
                {CATEGORIES.map(
                    category => (
                        <MenuItem key={createRandomKey()} value={category}>{category.toLowerCase()}</MenuItem>
                    )
                )}
            </TextField>
        </>
    );
}