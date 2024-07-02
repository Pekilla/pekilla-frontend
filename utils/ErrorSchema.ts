import { NumberSchema, StringSchema } from "yup";

export function notEmptyWithMaxAndMinLength(max: number, min: number, label?: string) {
    return new StringSchema()
        .required(`${label ?? ""} is required.`)
        .max(max, `${label ?? ""} cannot have more than ${max} characters.`)
        .min(min, `${label ?? ""} cannot have less than ${min} characters.`);
}