import StateManager from "../../StateManager";
import { troopTraining } from "./fiefMetrics";

export function trainTroops(currentState: StateManager) {
  let troops = currentState.fetch("soldiers");
  let peasantPop = currentState.fetch("peasants");
  let gold = currentState.fetch("gold");

  if (
    gold >= troopTraining.trainingCost &&
    peasantPop >= troopTraining.trainingLimit
  ) {
    currentState.update("peasants", peasantPop -= troopTraining.trainingLimit);
    currentState.update("gold", gold -= troopTraining.trainingCost);
    currentState.update("soldiers", troops += troopTraining.trainingLimit);
  } else {
    console.log(
      "You do not have enough money or peasants available to train troops!"
    );
  }
}
