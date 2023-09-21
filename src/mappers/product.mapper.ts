import {
    IProductLocalData,
} from '@/services/product/local-data/product-local-data.service.ts';
import { IProduct } from '@/services/product/product.interface.ts';


export const productLocalDataToProduct = function (productLocalData: IProductLocalData): IProduct {
    return {
        id                : productLocalData.barcode,
        title             : productLocalData.product_name,
        description       : productLocalData.description,
        price             : productLocalData.price,
        discountPercentage: productLocalData.discount_percentage,
        rating            : productLocalData.rating,
        stock             : productLocalData.quantity,
        brand             : productLocalData.brand,
        category          : productLocalData.category,
        thumbnail         : productLocalData.image_url,
        images            : [ productLocalData.image_url ],
    };
};