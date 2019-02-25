import { ProductDetail } from './productDetail.model';

export class BillingDetail {
    Id : string;
    CreationDate : Date;
    CustomerId : string;
    Name : string;
    DocumentId : string;
    PriceValue : number;
    PriceDescription : string;
    Products : ProductDetail[];
}