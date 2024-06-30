import { faList } from '@fortawesome/free-solid-svg-icons';
import { MenuItem, TextField } from '@mui/material';
import { FieldProps } from 'formik';
import { MUI_INPUT_VARIANT } from '../../../../../App';
import { CATEGORIES } from '../../../../../model/enums/Category';
import { createRandomKey } from '../../../../../util/RandomKeys';
import { IconLabel } from '../../../../shared/icon-label';

export default function CategorySelector(props: FieldProps) {
    return (
        <>
            <TextField
                label={
                    <IconLabel iconProp={faList} title="Category" />
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