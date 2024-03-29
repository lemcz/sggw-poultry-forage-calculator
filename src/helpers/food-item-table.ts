import { FieldType, FoodItemService } from '@/helpers/food-item.service';
import { FoodItemRecord, NutrientItem } from '@/models/foodItem.model';
import { extendFoodItemByProperty } from '@/helpers/utils';

export type TFieldType = 'TextField' | 'NumberField' | 'SelectField' | '';

export function getHeaderType(type?: FieldType): TFieldType {
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

// TODO fix the product type to make it work properly
export function fillProductWithDefaults(product: any, headers: NutrientItem[]): FoodItemRecord {
  return {
    ...product,
    ...headers.reduce((acc, header) => ({ ...acc, [header.property]: product[header.property] ?? 0 }), {}),
  };
}

export function getDefaultState(): { headers: NutrientItem[]; products: FoodItemRecord[]; tolerance: number } {
  const headers = FoodItemService.getHeaders();
  const products = FoodItemService.getProducts().map((product) => extendFoodItemByProperty(product));
  const DEFAULT_TOLERANCE = 0.01;

  return {
    headers,
    products,
    tolerance: DEFAULT_TOLERANCE,
  };
}
