import IconLabel from '@/components/shared/IconLabel';
import { MenuItem, TextField } from '@mui/material';
import { ErrorMessage, FieldProps } from 'formik';
import { ReactNode } from 'react';

type SelectorProps = {
    label: string;
    icon?: any;
    children?: ReactNode;
};

export function Selector(props: SelectorProps & FieldProps) {
    const { name } = props.field;
    const { errors, touched } = props.form;

    return (
        <>
            <TextField
                {...props.field}
                label={
                    <IconLabel label={props.label} icon={props.icon} />
                }
                sx={{
                    width: 200
                }}
                select
                helperText={<ErrorMessage name={name} />}
                error={!!errors[name] && touched[name] as boolean}
            >
                {props.children ? props.children : <MenuItem />}
            </TextField>
        </>
    );
}