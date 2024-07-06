import IconLabel from '@/components/shared/IconLabel';
import { TextField } from '@mui/material';
import { FieldProps } from 'formik';
import { ReactNode } from 'react';

type SelectorProps = {
    label: string;
    icon?: any;
    children?: ReactNode;
};

export function Selector(props: SelectorProps & FieldProps) {
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
            >
                {props.children}
            </TextField>
        </>
    );
}