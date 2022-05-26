import type { ProductDocument } from './models';
import type { ProductSlim, Product } from './types';

export class ProductMapper {
  static toProductSlim(document: ProductDocument): ProductSlim {
    return {
      id: document._id,
      name: document.name,
      amount: document.options[0].amount ?? 0,
      thumbnailUrl: document.images[0] ?? ''
    };
  }

  static toProductDetail(document: ProductDocument): Product {
    return {
      id: document._id.toString(),
      name: document.name,
      description: document.description,
      images: document.images,
      options: document.options.map((option) => {
        return {
          id: option._id?.toString() as string,
          amount: option.amount,
          variants: option.variants.map((variant) => {
            return {
              kind: variant.kind,
              value: variant.value,
              label: variant.label
            };
          })
        };
      })
    };
  }
}
