import { FoodItemRecord, NutrientItem } from '@/models/foodItem.model';
import { FoodItemModel } from '@/components/food-item-table/FoodItemTable.vue';

export enum FieldType {
  Text = 'text',
  Number = 'number',
  Select = 'select',
}

export enum ForageType {
  Prester = 'prester',
  Starter = 'starter',
  Grower = 'grower',
  Finiszer = 'finiszer',
  Nioska = 'nioska',
}

export function getLimitsData(limits: ForageTypeLimits, type: 'min' | 'max') {
  return {
    limit: type,
    ...Object.keys(limits).reduce((acc: { [key: string]: number | string }, curr) => {
      acc[curr] = (limits as any)[curr][type] ?? '-';
      return acc;
    }, {}),
  };
}

export function getLimitsHeaders(
  limits: ForageTypeLimits,
  collection: any[] = [],
): { property: string; label: string }[] {
  const firstColumn = {
    property: 'limit',
    label: '',
  };

  return (
    collection.reduce(
      (
        acc: { property: string; label: string }[],
        { property, label }: FoodItemModel,
      ): { property: string; label: string }[] => {
        if (!(limits as any)[property]) {
          return acc;
        }

        return [
          ...acc,
          {
            property,
            label,
          },
        ];
      },
      [firstColumn],
    ) ?? []
  );
}

export type NutrientItemProperty = string;
// TODO find a way to reflect that Record implements some keys of a ForageType
export type ForageTypeLimits = {
  [P in ForageType]?: Record<NutrientItemProperty, { min?: number; max?: number }>;
};

class FoodItemSingleton {
  // TODO find a common object for property name and display label - headers & limits
  headers: NutrientItem[] = [
    { label: 'Produkt', property: 'label', type: FieldType.Text },
    { label: '%', property: 'percentage', type: FieldType.Number },
    { label: 'Cena', property: 'cost', type: FieldType.Number },
    { label: 'Sucha masa', property: 'dryWeight', type: FieldType.Number },
    { label: 'Energia', property: 'energy', type: FieldType.Number },
    { label: 'Białko ogólne (g)', property: 'protein', type: FieldType.Number },
    { label: 'Lizyna (g)', property: 'lysine', type: FieldType.Number },
    { label: 'Metionina (g)', property: 'methionine', type: FieldType.Number },
    { label: 'Tryptofan (g)', property: 'tryptophan', type: FieldType.Number },
    { label: 'Arginina (g)', property: 'arginine', type: FieldType.Number },
    { label: 'Włókno (g)', property: 'fiber', type: FieldType.Number },
    { label: 'Ca (g)', property: 'calcium', type: FieldType.Number },
    { label: 'P ogólny (g)', property: 'phosphorus', type: FieldType.Number },
    { label: 'Na (g)', property: 'sodium', type: FieldType.Number },
  ];

  limits: ForageTypeLimits = {
    [ForageType.Starter]: {
      energy: {
        min: 12.1,
        max: 12.9,
      },
      protein: {
        min: 210,
        max: 224,
      },
      lysine: {
        min: 13,
      },
      methionine: {
        min: 6.5,
      },
      tryptophan: {
        min: 2.2,
      },
      fiber: {
        max: 40,
      },
      calcium: {
        min: 10,
      },
      phosphorus: {
        min: 6.5,
      },
      sodium: {
        min: 0.15,
      },
    },
    [ForageType.Grower]: {
      energy: {
        min: 12.3,
        max: 13.4,
      },
      protein: {
        min: 193,
        max: 200,
      },
      lysine: {
        min: 14,
      },
      methionine: {
        min: 7,
      },
      tryptophan: {
        min: 2,
      },
      fiber: {
        max: 40,
      },
      calcium: {
        min: 10,
      },
      phosphorus: {
        min: 6.3,
      },
      sodium: {
        min: 0.15,
      },
    },
    [ForageType.Nioska]: {
      energy: {
        min: 11.3,
        max: 11.7,
      },
      protein: {
        min: 155,
        max: 175,
      },
      lysine: {
        min: 9,
      },
      methionine: {
        min: 3.5,
      },
      tryptophan: {
        min: 1.7,
      },
      fiber: {
        max: 40,
      },
      calcium: {
        min: 32,
      },
      phosphorus: {
        min: 5.5,
      },
      sodium: {
        min: 0.15,
      },
    },
  };

  products: FoodItemRecord[] = [
    {
      label: 'Śruta jęczmienna',
      percentage: 0,
      cost: 22.6,
      dryWeight: 880,
      energy: 11.85,
      protein: 111,
      lysine: 3.88,
      methionine: 1.8,
      tryptophan: 1.3,
      arginine: 5.1,
      fiber: 48,
      calcium: 0.4,
      phosphorus: 3.7,
      sodium: 0.1,
    },
    {
      label: 'Śruta pszenna',
      percentage: 0,
      cost: 18.3,
      dryWeight: 880,
      energy: 12.85,
      protein: 118,
      lysine: 3.54,
      methionine: 1.8,
      tryptophan: 1.3,
      arginine: 5.3,
      fiber: 29,
      calcium: 0.7,
      phosphorus: 3.7,
      sodium: 0.1,
    },
    {
      label: 'Śruta pszenżytnia',
      percentage: 0,
      cost: 30,
      dryWeight: 880,
      energy: 12.6,
      protein: 120,
      lysine: 3.8,
      methionine: 1.8,
      tryptophan: 1.2,
      arginine: 5.2,
      fiber: 24,
      calcium: 0.4,
      phosphorus: 3.7,
      sodium: 0.1,
    },
    {
      label: 'Śruta kukurydziana',
      percentage: 0,
      cost: 25,
      dryWeight: 880,
      energy: 13.75,
      protein: 93,
      lysine: 2.61,
      methionine: 1.8,
      tryptophan: 0.6,
      arginine: 3.9,
      fiber: 29,
      calcium: 0.4,
      phosphorus: 2.6,
      sodium: 0.2,
    },
    {
      label: 'Śruta z owsa',
      percentage: 0,
      cost: 28,
      dryWeight: 880,
      energy: 10.75,
      protein: 114,
      lysine: 4.57,
      methionine: 1.8,
      tryptophan: 1.2,
      arginine: 6.8,
      fiber: 89,
      calcium: 0.7,
      phosphorus: 3.7,
      sodium: 0.6,
    },
    {
      label: 'Otręby pszenne',
      percentage: 0,
      cost: 15,
      dryWeight: 880,
      energy: 8.5,
      protein: 143,
      lysine: 5.74,
      methionine: 2.7,
      tryptophan: 2.6,
      arginine: 9.8,
      fiber: 63,
      calcium: 1.1,
      phosphorus: 10.2,
      sodium: 0.3,
    },
    {
      label: 'Śruta z bobiku',
      percentage: 0,
      cost: 20,
      dryWeight: 880,
      energy: 10.1,
      protein: 268,
      lysine: 17.7,
      methionine: 1.9,
      tryptophan: 2.3,
      arginine: 23.9,
      fiber: 73,
      calcium: 1.2,
      phosphorus: 5.3,
      sodium: 0.1,
    },
    {
      label: 'Śruta z łubinu żółtego',
      percentage: 0,
      cost: 18,
      dryWeight: 880,
      energy: 8.3,
      protein: 390,
      lysine: 19.5,
      methionine: 2.5,
      tryptophan: 3.1,
      arginine: 43.1,
      fiber: 135,
      calcium: 2.4,
      phosphorus: 7.1,
      sodium: 0.1,
    },
    {
      label: 'Śruta z grochu',
      percentage: 0,
      cost: 20,
      dryWeight: 880,
      energy: 10.35,
      protein: 209,
      lysine: 15.6,
      methionine: 2,
      tryptophan: 2.2,
      arginine: 18.3,
      fiber: 60,
      calcium: 0.8,
      phosphorus: 3.6,
      sodium: 0.1,
    },
    {
      label: 'Pełnotłusta śruta z rzepaku',
      percentage: 0,
      cost: 28,
      dryWeight: 930,
      energy: 18.85,
      protein: 192,
      lysine: 12.4,
      methionine: 4,
      tryptophan: 2.8,
      arginine: 13.6,
      fiber: 101,
      calcium: 3.4,
      phosphorus: 7,
      sodium: 0.2,
    },
    {
      label: 'Pełnotlusta soja ekstrudowana',
      percentage: 0,
      cost: 28,
      dryWeight: 930,
      energy: 13.55,
      protein: 350,
      lysine: 20.7,
      methionine: 4.7,
      tryptophan: 4.6,
      arginine: 24.8,
      fiber: 64,
      calcium: 2.6,
      phosphorus: 6.2,
      sodium: 0.3,
    },
    {
      label: 'Śruta poekstrakcyjna rzepakowa',
      percentage: 0,
      cost: 20,
      dryWeight: 880,
      energy: 7.45,
      protein: 340,
      lysine: 18.2,
      methionine: 6.9,
      tryptophan: 4.5,
      arginine: 20.4,
      fiber: 112,
      calcium: 6.6,
      phosphorus: 11.2,
      sodium: 0.4,
    },
    {
      label: 'Śruta poekstrakcyjna sojowa (42-46)',
      percentage: 0,
      cost: 27,
      dryWeight: 880,
      energy: 8.6,
      protein: 420,
      lysine: 26.1,
      methionine: 5.6,
      tryptophan: 5.2,
      arginine: 34.5,
      fiber: 102,
      calcium: 3.5,
      phosphorus: 5.4,
      sodium: 0.4,
    },
    {
      label: 'Śruta poekstrakcyjna sojowa (>46 b.o.)',
      percentage: 0,
      cost: 13,
      dryWeight: 880,
      energy: 9,
      protein: 466,
      lysine: 27.5,
      methionine: 6.5,
      tryptophan: 6.2,
      arginine: 35.5,
      fiber: 78,
      calcium: 3.5,
      phosphorus: 5.4,
      sodium: 0.4,
    },
    {
      label: 'Śruta poekstrakcyjna słonecznikowa (obł)',
      percentage: 0,
      cost: 17,
      dryWeight: 880,
      energy: 6.5,
      protein: 340,
      lysine: 12.1,
      methionine: 7.4,
      tryptophan: 4.2,
      arginine: 27.5,
      fiber: 175,
      calcium: 3.2,
      phosphorus: 8.8,
      sodium: 0.2,
    },
    {
      label: 'DDGS kukurydziany',
      percentage: 0,
      cost: 19,
      dryWeight: 880,
      energy: 10.69,
      protein: 260,
      lysine: 5.1,
      methionine: 4.7,
      tryptophan: 3.8,
      arginine: 11.6,
      fiber: 77,
      calcium: 2.1,
      phosphorus: 8.4,
      sodium: 5.4,
    },
    {
      label: 'Drożdże pastewne',
      percentage: 0,
      cost: 25,
      dryWeight: 900,
      energy: 10.3,
      protein: 426,
      lysine: 29.4,
      methionine: 6.4,
      tryptophan: 5,
      arginine: 18.9,
      fiber: 65,
      calcium: 5,
      phosphorus: 14.3,
      sodium: 0.1,
    },
    {
      label: 'Mleko odtłuszczone',
      percentage: 0,
      cost: 20,
      dryWeight: 930,
      energy: 9.85,
      protein: 327,
      lysine: 26.1,
      methionine: 8.8,
      tryptophan: 4.5,
      arginine: 11.6,
      fiber: 0,
      calcium: 12.4,
      phosphorus: 8.8,
      sodium: 5,
    },
    {
      label: 'Serwatka',
      percentage: 0,
      cost: 7,
      dryWeight: 930,
      energy: 8,
      protein: 122,
      lysine: 9.5,
      methionine: 1.8,
      tryptophan: 1.7,
      arginine: 2.9,
      fiber: 0,
      calcium: 5.1,
      phosphorus: 6,
      sodium: 6.5,
    },
    {
      label: 'Susz z lucerny',
      percentage: 0,
      cost: 26,
      dryWeight: 910,
      energy: 5.45,
      protein: 202,
      lysine: 9.3,
      methionine: 2.9,
      tryptophan: 3.4,
      arginine: 8.1,
      fiber: 206,
      calcium: 13.2,
      phosphorus: 3.1,
      sodium: 0.8,
    },
    {
      label: 'Olej',
      percentage: 0,
      cost: 30,
      dryWeight: 1000,
      energy: 37.65,
      protein: 0,
      lysine: 0,
      methionine: 0,
      tryptophan: 0,
      arginine: 0,
      fiber: 0,
      calcium: 0,
      phosphorus: 0,
      sodium: 0,
    },
    {
      label: 'Mączka rybna (65% b.o.)',
      percentage: 0,
      cost: 18,
      dryWeight: 910,
      energy: 12.2,
      protein: 647,
      lysine: 49.3,
      methionine: 20.1,
      tryptophan: 7.4,
      arginine: 37.4,
      fiber: 0,
      calcium: 33.2,
      phosphorus: 27.6,
      sodium: 11.3,
    },
    {
      label: 'Metionina (50%)',
      percentage: 0,
      cost: 18,
      dryWeight: 900,
      energy: 12.2,
      protein: 0,
      lysine: 0,
      methionine: 500,
      tryptophan: 0,
      arginine: 0,
      fiber: 0,
      calcium: 0,
      phosphorus: 0,
      sodium: 0,
    },
    {
      label: 'Lizyna (50%)',
      percentage: 0,
      cost: 30,
      dryWeight: 900,
      energy: 0,
      protein: 0,
      lysine: 500,
      methionine: 0,
      tryptophan: 0,
      arginine: 0,
      fiber: 0,
      calcium: 0,
      phosphorus: 0,
      sodium: 0,
    },
    {
      label: 'Kreda pastewna',
      percentage: 0,
      cost: 5,
      dryWeight: 900,
      energy: 0,
      protein: 0,
      lysine: 0,
      methionine: 0,
      tryptophan: 0,
      arginine: 0,
      fiber: 0,
      calcium: 360.6,
      phosphorus: 0.2,
      sodium: 0.6,
    },
    {
      label: 'Fosforan jednowapniowy',
      percentage: 0,
      cost: 29,
      dryWeight: 900,
      energy: 0,
      protein: 0,
      lysine: 0.02,
      methionine: 0,
      tryptophan: 0,
      arginine: 0,
      fiber: 0,
      calcium: 220,
      phosphorus: 230,
      sodium: 0,
    },
    {
      label: 'NaCl',
      percentage: 0,
      cost: 20,
      dryWeight: 900,
      energy: 0,
      protein: 0,
      lysine: 0.02,
      methionine: 0,
      tryptophan: 0,
      arginine: 0,
      fiber: 3,
      calcium: 0,
      phosphorus: 0,
      sodium: 393,
    },
    {
      label: 'Premix (7% lizyny)',
      percentage: 0,
      cost: 35,
      dryWeight: 900,
      energy: 0,
      protein: 0,
      lysine: 70,
      methionine: 0,
      tryptophan: 0,
      arginine: 0,
      fiber: 0,
      calcium: 0,
      phosphorus: 0,
      sodium: 0,
    },
  ];

  getProducts(): FoodItemRecord[] {
    return this.products;
  }

  getHeaders(): NutrientItem[] {
    return this.headers;
  }
}

export const FoodItemService = new FoodItemSingleton();
