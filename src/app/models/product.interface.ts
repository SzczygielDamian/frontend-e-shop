export interface Product {
    sku: string;
    name: string;
    description: string;
    unitPrice: string;
    imageUrl: string;
    active: boolean;
    unitsInStock: number;
    dateCreated: Date;
    lastUpadted: Date;
}