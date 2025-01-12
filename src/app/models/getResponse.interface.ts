export interface GetResponse<K extends string | number, V> {
    _embedded: {
        [key in K]: V[];
    },
    page: {
        size: number;
        totalElements: number;
        totalPages: number;
        number: number;
    }
}