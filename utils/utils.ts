export function equals(obj1: any, obj2: any): boolean {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export const MUI_INPUT_VARIANT = "outlined";