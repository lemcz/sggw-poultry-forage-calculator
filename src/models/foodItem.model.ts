import { FieldType, NutrientItemProperty } from '@/helpers/food-item.service';
import { FieldMode } from '@/models/fieldMode';

export interface NutrientItem {
  label: string;
  property: NutrientItemProperty;
  ingredientValue: boolean;
  type?: FieldType;
  mode?: FieldMode;
}

export type FoodItemRecord = (FoodItem & { property: string }) | FoodCustomProperty;

export interface FoodItem {
  label: string;
  percentage: number;
  cost: number;
  dryWeight?: number;
  energy?: number;
}

export type FoodCustomProperty = { [key: string]: string | number };
