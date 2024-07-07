
export function equals(obj1: any, obj2: any): boolean {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

/**
 * Function to remove the value that are empty from being 
 * casted in the URL.
 */
export function filterFunc(prefix: any, value: any) {
    if (value == "") { return undefined; }
    else return value;
}