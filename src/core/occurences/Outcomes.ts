import { Opaque } from "../../utils/Utils";

type Outcome = Opaque<"Outcome", { id: number; name: string }>;
const OutcomeID = { last: 0 };
const OC = (name: string): Outcome => {
  return { __TYPE__: "Outcome", id: OutcomeID.last += 1, name } as Outcome;
};

const Outcomes = [
  OC("Helpful Neighbor"),
  OC("Vengeful Foe"),
  OC("Gullible"),
  OC("Traitor"),
  OC("Money Minded"),
];

export { Outcome, Outcomes };
