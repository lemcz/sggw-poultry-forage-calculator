import { FieldType, FoodItemService } from '@/helpers/food-item.service';
import { FoodItemRecord, NutrientItem } from '@/models/foodItem.model';

export function getHeaderType(type?: FieldType): 'TextField' | 'NumberField' | 'SelectField' | '' {
  switch (type) {
    case FieldType.Text:
      return 'TextField';
    case FieldType.Number:
      return 'NumberField';
    case FieldType.Select:
      return 'SelectField';
  }
  return '';
}

export function fillProductWithDefaults(product: any, headers: NutrientItem[]): FoodItemRecord {
  return {
    ...product,
    ...headers.reduce((acc, header) => ({ ...acc, [header.property]: product[header.property] ?? 0 }), {}),
  };
}

export function getDefaultState(): { headers: NutrientItem[]; products: FoodItemRecord[] } {
  const headers = FoodItemService.getHeaders();
  const products = FoodItemService.getProducts().map((product: FoodItemRecord) =>
    fillProductWithDefaults(product, headers),
  );

  return {
    headers,
    products,
  };
}
