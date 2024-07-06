import { Selector } from "@/components/shared/selector/Selector";
import FilterListIcon from '@mui/icons-material/FilterList';
import { MenuItem } from "@mui/material";
import { FieldProps } from "formik";

const SORT_TYPE = [
    "Newest", 
    "Last Modified"
];

export default function SortedSelector(props: FieldProps) {
    return (
        <Selector label="Sorted by" {...props} icon={<FilterListIcon />}>
            {SORT_TYPE.map((sortType, index) => (
                <MenuItem key={sortType} value={index}>{sortType}</MenuItem>
            ))}
        </Selector>
    );
}