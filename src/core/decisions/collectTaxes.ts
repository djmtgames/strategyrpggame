import StateManager from "../../StateManager";
import { BaseTaxRate } from "./fiefMetrics";

// Returns the amount of gold calculated by the number of peasants multiplied by the tax rate.
export function collectTaxes(currentState: StateManager) {
  const pesantPop = currentState.fetch("peasants");

  return pesantPop * BaseTaxRate;
}
