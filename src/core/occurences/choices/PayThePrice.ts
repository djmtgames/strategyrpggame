import { Choice } from "../Occurence";
import { Outcomes } from "../Outcomes";

export default class PayThePrice implements Choice {
  private readonly _name = "foo";
  private cost: number;

  constructor(amount: number) {
    this.cost = amount;
  }
  name() {
    return this._name;
  }

  description() {
    return "wo";
  }

  outcome() {
    return Outcomes[0];
  }
}
