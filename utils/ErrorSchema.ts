import { string } from "yup";

export function notEmptyWithMaxAndMinLength(max: number, min: number, label?: string) {
    return string()
        .required(`${label ?? ""} is required.`)
        .max(max, `${label ?? ""} cannot have more than ${max} characters.`)
        .min(min, `${label ?? ""} cannot have less than ${min} characters.`);
}

export function passwordSchema(label: string) {
    return notEmptyWithMaxAndMinLength(255, 8, label);
}