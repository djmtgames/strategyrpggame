export const FoodConsumptionRate: number = 10;
export const PopulationGrowthRate: number = 0.2;
export const PopulationDeathRate: number = 0.1;
export const BaseFoodProductionRange: [number, number] = [8, 12];
export const BaseTaxRate: number = 1;
export const BaseDecisions = [
  "collectTaxes",
  "buyFood",
  "trainTroops",
  "constructBuildings",
];

interface troopTraining {
  trainingLimit: number;
  trainingCost: number;
}

export const troopTraining: troopTraining = {
  trainingLimit: 20,
  trainingCost: 10,
};

interface FoodMarketRate {
  food: number;
  rate: number;
}

export let currentFoodMarketRate: FoodMarketRate = {
  food: 20,
  rate: 5,
};

interface Building {
  amount: number;
  description: string;
  effect: {
    resource: string;
    impact: number;
  };
}

export let fiefBuildings: object = {
  farms: {
    amount: 0,
    description:
      "Farms allow 20 of your peasants to work in the fields and grow more food than they would by just subsistence farming.",
    effect: {
      resource: "food",
      impact: 20,
    },
  },
};
