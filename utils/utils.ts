export function equals(obj1: any, obj2: any): boolean {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

/**
 * Function that take a param that as been given by the user in the URL. If this param is an Array, you will get
 * this array, otherwise, you wil get a an array that contain param.
 * 
 * @param param 
 * @returns A list.
 */
export function getAListFromParam(param: any) {
    return param instanceof Array ? param : [param];
}