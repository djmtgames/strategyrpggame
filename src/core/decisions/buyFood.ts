import StateManager from "../../StateManager";
import { currentFoodMarketRate } from "./fiefMetrics";

// Buys a set amount of food for the player for an amount of gold based on the current market rate.
export function buyFood(currentState: StateManager) {
  let gold = currentState.fetch("gold");
  let food = currentState.fetch("food");

  if (gold >= currentFoodMarketRate.rate) {
    food += currentFoodMarketRate.rate * currentFoodMarketRate.food;
    gold -= currentFoodMarketRate.rate;
    console.log("You bought " + currentFoodMarketRate.food + " food for " + currentFoodMarketRate.rate + " gold");
  } else {
    console.log("You do not have enough money!");
  }

  currentState.update("gold", gold);
  currentState.update("food", food);
}
