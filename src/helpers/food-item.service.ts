import { FoodItemRecord, NutrientItem } from '@/models/foodItem.model';
import { FieldMode } from '@/models/fieldMode';

export enum FieldType {
  Text = 'text',
  Number = 'number',
  Select = 'select',
}

export enum ForageType {
  Prester,
  Starter,
  Grower,
  Finiszer,
  Nioska1,
  Nioska2,
}

type Foo = Record<ForageType, { [k: string]: { min?: number; max?: number } }>;

class FoodItemSingleton {
  headers: NutrientItem[] = [
    { label: 'Produkt', property: 'label', type: FieldType.Text, mode: FieldMode.View },
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

  limits: any = {
    [ForageType.Starter]: {
      energy: {
        min: 12.1,
        max: 12.9,
      },
      protein: {
        min: 12.1,
        max: 12.9,
      },
      lysine: {
        min: 12.1,
        max: 12.9,
      },
      methionine: {
        min: 12.1,
        max: 12.9,
      },
      tryptophan: {
        min: 12.1,
        max: 12.9,
      },
      arginine: {
        min: 0,
        max: Infinity,
      },
      fiber: {
        min: 0,
        max: 40,
      },
      calcium: {
        min: 0,
        max: 10,
      },
      phosphorus: {
        min: 6.5,
        max: 6.5,
      },
      sodium: {
        min: 0.15,
        max: 0.15,
      },
    },
  };

  products: FoodItemRecord[] = [
    {
      label: 'Śruta jęczmienna',
      percentage: 0,
      cost: 0,
      dryWeight: 0,
      energy: 0,
      protein: 0,
      lysine: 0,
    },
    {
      label: 'Śruta pszenna',
      percentage: 0,
      cost: 0,
      dryWeight: 0,
      energy: 0,
      protein: 0,
    },
    {
      label: 'Śruta pszenżytnia',
      percentage: 0,
      cost: 0,
      dryWeight: 0,
      energy: 0,
      protein: 0,
    },
    {
      label: 'Śruta kukurydziana',
      percentage: 0,
      cost: 0,
      dryWeight: 0,
      energy: 0,
      protein: 0,
    },
    {
      label: 'Śruta z owsa',
      percentage: 0,
      cost: 0,
      dryWeight: 0,
      energy: 0,
      protein: 0,
    },
    {
      label: 'Otręby pszenne',
      percentage: 0,
      cost: 0,
      dryWeight: 0,
      energy: 0,
      protein: 0,
    },
    {
      label: 'Śruta z bobiku',
      percentage: 0,
      cost: 0,
      dryWeight: 0,
      energy: 0,
      protein: 0,
    },
    {
      label: 'Śruta z łubinu żółtego',
      percentage: 0,
      cost: 0,
      dryWeight: 0,
      energy: 0,
      protein: 0,
    },
    {
      label: 'Śruta z grochu',
      percentage: 0,
      cost: 0,
      dryWeight: 0,
      energy: 0,
      protein: 0,
    },
    {
      label: 'Pełnotłusta śruta z rzepaku',
      percentage: 0,
      cost: 0,
      dryWeight: 0,
      energy: 0,
      protein: 0,
    },
    {
      label: 'Pełnotlusta soja ekstrudowana',
      percentage: 0,
      cost: 0,
      dryWeight: 0,
      energy: 0,
      protein: 0,
    },
    {
      label: 'Śruta poekstrakcyjna rzepakowa',
      percentage: 0,
      cost: 0,
      dryWeight: 0,
      energy: 0,
      protein: 0,
    },
    {
      label: 'Śruta poekstrakcyjna sojowa (42-46)',
      percentage: 0,
      cost: 0,
      dryWeight: 0,
      energy: 0,
      protein: 0,
    },
    {
      label: 'Śruta poekstrakcyjna sojowa (>46 b.o.)',
      percentage: 0,
      cost: 0,
      dryWeight: 0,
      energy: 0,
      protein: 0,
    },
    {
      label: 'Śruta poekstrakcyjna słonecznikowa (obł)',
      percentage: 0,
      cost: 0,
      dryWeight: 0,
      energy: 0,
      protein: 0,
    },
    {
      label: 'DDGS kukurydziany',
      percentage: 0,
      cost: 0,
      dryWeight: 0,
      energy: 0,
      protein: 0,
    },
  ];

  getProducts() {
    return this.products;
  }

  getHeaders() {
    return this.headers;
  }
}

export const FoodItemService = new FoodItemSingleton();
