export type FoodItemRecord = FoodItem | FoodCustomProperty;

export interface FoodItem {
  name: string;
  percentage: number;
  cost: number;
  dryWeight?: number;
  energy?: number;
}

export type FoodCustomProperty = Record<string, number | undefined>;
