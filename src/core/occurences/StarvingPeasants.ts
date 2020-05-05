import { Refuse } from "./choices/Refuse";
import PayThePrice from "./choices/PayThePrice";
import { Occurence } from "./Occurence";
class StarvingPeasants extends Occurence {
  name = "Starving Peasants";
  description =
    "A group of nearby peasants approach you asking for food. They say they have nothing to give in return, they just need food.";
  choices = [new PayThePrice(10), new Refuse()];
}
