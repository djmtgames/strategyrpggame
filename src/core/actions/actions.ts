import StateManager from "../../StateManager";
import {
  PopulationGrowthRate,
  PopulationDeathRate,
  BaseFoodProductionRange,
  FoodConsumptionRate,
} from "../decisions/fiefMetrics";

function randomIntFromInterval(minMax: [number, number]) {
  return Math.floor(Math.random() * (minMax[1] - minMax[0] + 1) + minMax[0]);
}

export function populationGrowth(currentState: StateManager) {
  const pop = currentState.fetch("peasants");

  console.log(
    "Total population grew = " + Math.floor(pop * PopulationGrowthRate)
  );
  return Math.floor(pop * PopulationGrowthRate);
}

export function populationStarve(currentState: StateManager) {
  const pop = currentState.fetch("peasants");

  console.log(
    "Total population starved = " + Math.floor(pop * PopulationDeathRate)
  );
  return Math.floor(pop * PopulationDeathRate);
}

export function growFood(currentState: StateManager) {
  const peasants = currentState.fetch("peasants");
  let foodTotal = 0;

  for (let x = 0; x < peasants; x++) {
    foodTotal += randomIntFromInterval(BaseFoodProductionRange);
  }

  console.log("Total food grown by " + peasants + " peasants is " + foodTotal);
  return foodTotal;
}

export function consumeFood(currentState: StateManager) {
  const peasants = currentState.fetch("peasants");
  const soldiers = currentState.fetch("soldiers");

  console.log(
    "Total food eaten = " + (peasants + soldiers) * FoodConsumptionRate
  );
  return (peasants + soldiers) * FoodConsumptionRate;
}

export function isPopulationStarving(currentState: StateManager) {
  const food = currentState.fetch("food");
  const totalPopulation = currentState.fetch("peasants") + currentState.fetch("soldiers");
  const totalFoodNeeded = totalPopulation * FoodConsumptionRate;

  return totalFoodNeeded > food;
}

export function calcualeStarvationDeaths(currentState: StateManager) {
  let population = {
    peasants: currentState.fetch("peasants"),
    soldiers: currentState.fetch("soldiers"),
    totalPopulation: 0,
    totalFoodConsumption: 0,
    starvedPeasants: 0,
    starvedSoldiers: 0
  }

  population.totalPopulation = population.peasants + population.soldiers;
  population.totalFoodConsumption = population.totalPopulation * FoodConsumptionRate;

  const totalStarved = Math.floor(population.totalPopulation * 0.1);

  if(population.peasants > 0 && population.soldiers > 0) {
    population.starvedPeasants = Math.floor(totalStarved / 2);
    population.starvedSoldiers = Math.floor(totalStarved / 2);
  } else if (population.peasants > 0) {
    population.starvedPeasants = Math.floor(totalStarved);
  } else {
    console.log("EVERYON IS DEAD");
  }

  console.log("You do not have enough food for your entire population and " + totalStarved + " have starved");
  console.log(population.starvedPeasants + " peasants starved.");
  console.log(population.starvedSoldiers + " soldiers starved.");

  return population;
}