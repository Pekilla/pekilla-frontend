/**
 * Interface representing Spring Page system.
 */
export default interface Page<T> {
    content: Array<T>;
    page: { size: number, number: number, totalElements: number, totalPages: number }
}

export function getCorrectPage(page?: number): number {
    return page && page > 0 ? page : 1;
}