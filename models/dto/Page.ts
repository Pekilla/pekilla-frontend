/**
 * Interface representing Spring Page system.
 */
export default interface Page<T> {
    content: Array<T>;
    page: { size: number, number: number, totalElements: number, totalPages: number }
}

/**
 * Function that will verify that the `page` parameter is valid(not undefined and more than 0) if the condition is
 * false then the fonction return 1 to redirect the user to page 1 or it will return the page in parameter
 */
export function getCorrectPage(page?: number): number {
    return page && page > 0 ? page : 1;
}

/**
 * Function to show the result what is the range of the element of the page and what is the total of element
 * ex : Result 1 - 4 of 4
 */
export function getResultOf<T>(page: Page<T>) {
    if(page?.page?.totalElements == 0) {
        return `Results 0 - 0 of 0`;
    }

    if (page?.page?.number <= page?.page?.totalPages) {
        /**
         * The first element index element will equal the pageNumber(?) * pageSize(10).
         * Page 0: (0 * 10) + 1 = 1
         * Page 1: (1 * 10) + 1 = 11
         * ...
         */
        let start = (page?.page?.size * page?.page?.number) + 1;
        
        /**
         * We have to put this if terner because the pageSize will always equals the size we set in the page request.
         * So if the page is equal to the last one we use the length of the content instead because we do not
         * if this page will contain the page size or less.
         */ 
        let end = start + (page?.page?.number == page?.page?.totalPages - 1 ? page?.content?.length - 1 : page?.page?.size - 1);

        return `Results ${start} - ${end} of ${page?.page?.totalElements}`;
    }

    else return null;
}