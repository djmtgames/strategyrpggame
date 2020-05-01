type Opaque<K, T> = T & { __TYPE__: K };

type Outcome = Opaque<"Outcome", { id: number; name: string }>;

const OutcomeID = { last: 0 };
const OC = (name: string): Outcome => {
  return { __TYPE__: "Outcome", id: OutcomeID.last += 1, name } as Outcome;
};

const Outcomes = [OC("Helpful Neighbor"), OC("Vengeful Foe")];

interface Choice {
  name(): string;
  description(): string;
  outcome(): Outcome;
}

class PayThePrice implements Choice {
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

class Refuse implements Choice {
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

export default abstract class Occurence {
  abstract name: string;
  abstract description: string;
  abstract choices: Choice[];
}

class StarvingPeasants extends Occurence {
  name = "Starving Peasants";
  description =
    "A group of nearby peasants approach you asking for food. They say they have nothing to give in return, they just need food.";
  choices = [new PayThePrice(10), new Refuse()];
}
