import { Selector } from "./Selector";
import { CATEGORIES } from "@/models/enums/Category";
import { createRandomKey } from "@/utils/RandomKeys";
import { MenuItem } from "@mui/material";
import { FieldProps } from "formik";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

export default function CategorySelector(props: FieldProps) {
    return (
        <Selector label="Category" {...props} icon={<FormatListBulletedIcon />}>
            {CATEGORIES.map(
                category => (
                    <MenuItem key={createRandomKey()} value={category}>{category.toLowerCase()}</MenuItem>
                )
            )}
        </Selector>
    );
}