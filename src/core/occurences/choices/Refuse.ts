import { Outcomes } from "../Outcomes";
import { Choice } from "../Occurence";
export class Refuse implements Choice {
  name() {
    return "foo";
  }
  description() {
    return "foo";
  }
  outcome() {
    return Outcomes[0];
  }
}
