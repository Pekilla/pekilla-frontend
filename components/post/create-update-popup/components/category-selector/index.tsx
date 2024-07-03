import { MenuItem, TextField, Typography } from '@mui/material';
import { FieldProps } from 'formik';
import { CATEGORIES } from '@models/enums/Category';
import { createRandomKey } from '@utils/RandomKeys';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { MUI_INPUT_VARIANT } from '@/utils/utils';
import IconLabel from '@/components/shared/IconLabel';

export default function CategorySelector(props: FieldProps) {
    return (
        <>
            <TextField
                label={
                    <IconLabel label="Category" icon={<FormatListBulletedIcon />} />
                }
                variant={MUI_INPUT_VARIANT}
                sx={{
                    width: 200
                }}
                select
                {...props.field}
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