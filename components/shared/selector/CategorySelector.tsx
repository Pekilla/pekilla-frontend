import { getNames } from "@/services/CategoryService";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Divider, MenuItem } from "@mui/material";
import { FieldProps } from "formik";
import { useEffect, useState } from "react";
import { Selector } from "./Selector";


export default function CategorySelector(props: { isFilter?: boolean } & FieldProps) {
    const [allCategories, setAllCategories] = useState<string[]>();

    useEffect(() => {
        getNames().then(res => setAllCategories(res?.data))
    }, []);

    return (
        <Selector label="Category" {...props} icon={<FormatListBulletedIcon />}>
            {/* Duplicate because get error when using fragment. */}
            {props.isFilter ? (<MenuItem value="">ALL</MenuItem>) : null}
            {props.isFilter ? (<Divider />) : null}
            
            {allCategories?.map((category: string) => (
                <MenuItem key={category} value={category}>{category}</MenuItem>
            ))}
        </Selector>
    );
}