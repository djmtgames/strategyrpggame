import Scene from "./Scene";
import * as PIXI from "pixi.js";
import { Game } from "../Game";
import GameSceneAssets from "../assets/GameSceneAssets";
import AttackEvent from "../events/AttackEvent";
import SizedSet from "../utils/SizedSet";
import EventQueue from "../events/EventQueue";
import Button from "../components/Button";

interface Resource {
  name: string;
  value: number;
}

interface Decision {
  name: string;
  value: number;
}

const NOOP = () => undefined;
const defaultButton = new Button({
  width: 0,
  height: 0,
  text: "-",
  mouseover: NOOP,
  mouseout: NOOP,
  click: NOOP,
  isActive: NOOP,
});

const FoodConsumptionRate: number = 10;
const PopulationGrowthRate: number = 0.2;
const PopulationDeathRate: number = 0.1;
const BaseFoodProductionRange: number[] = [8, 12];
const BaseTaxRate: number = 1;

const Peasants = {
  name: "Peasants",
  value: 10,
};

const Food = {
  name: "Food",
  value: 100,
};

const Population = {
  name: "Popl",
  value: 10,
};

const Happiness = {
  name: "Happiness",
  value: 100,
};

const Gold = {
  name: "Gold",
  value: 100,
};

const choiceStyles = {
  default: new PIXI.TextStyle({ fill: "black" }),
  hover: new PIXI.TextStyle({ fill: "white" }),
  selected: new PIXI.TextStyle({ fill: "yellow" }),
  selectedHovered: new PIXI.TextStyle({ fill: "red" }),
};

const resourceTextStyles = new PIXI.TextStyle({
  fontFamily: "Courier",
  fontWeight: "Bold",
})

// These should be a class or something more complex since a lot of the logic then has to be implemented in the GameScene instead of somewhere else.
let baseDecisions: Decision[] = [
  {
    name: "Collect Taxes",
    value: 0,
  },
  {
    name: "Construct a new building",
    value: 1,
  },
  {
    name: "Train troops",
    value: 2,
  },
  {
    name: "Move troops",
    value: 3,
  },
  {
    name: "Sell food at the market",
    value: 4,
  },
];

export default class GameScene extends Scene {
  /*
      - CREATE resources (Food, Population, Happiness, Gold)
      - Manage resource gain and drains (each resource should acrew on some schedule, but go down on another)
         - How is that visually represented?
         - What is the interactivity involved?
      - Map interface.
      - Details for city/fief/township/etc/etc/etc
    */
  /*
      - CREATE resources (Food, Population, Happiness, Gold)
      - Manage resource gain and drains (each resource should acrew on some schedule, but go down on another)
         - How is that visually represented?
         - What is the interactivity involved?
      - Map interface.
      - Details for city/fief/township/etc/etc/etc
    */
  resources: { [x: string]: Resource };
  decisions: { label: Button; decision: Decision }[];
  foodPurchase: PIXI.Text = new PIXI.Text("");
  purchaseContainer: PIXI.Container = new PIXI.Container();
  resourceContainer: PIXI.Container = new PIXI.Container();
  buildingsContainer: PIXI.Container = new PIXI.Container();
  foodResource: PIXI.Text = new PIXI.Text("");
  goldResource: PIXI.Text = new PIXI.Text("");
  turnDisplay: PIXI.Text = new PIXI.Text("");
  populationResource: PIXI.Text = new PIXI.Text("");
  decisionContainer: PIXI.Container = new PIXI.Container();
  choices: Button[];
  selectedChoices: SizedSet<number>;
  endTurnButton: any;
  turnNumber: number;
  eventQueue: PIXI.Text = new PIXI.Text("");

  constructor() {
    super();
    this.resources = {};
    this.decisions = [];
    this.choices = [];
    this.selectedChoices = new SizedSet(2);
    this.turnNumber = 0;
  }

  create(g: Game) {
    this.resources = { Food, Population, Happiness, Gold };
    this.decisions = baseDecisions.map((x) => ({
      label: defaultButton,
      decision: x,
    }));
    this.choices = [];
    this.turnNumber = 1;
<<<<<<< HEAD
    this.selectedChoices = [];
    this.gameSceneAssets = new GameSceneAssets()
=======
    this.selectedChoices = new SizedSet(2);
>>>>>>> Adding SizedSet and Button class to clean up logic.
    this.purchaseContainer = new PIXI.Container();
    this.resourceContainer = new PIXI.Container();
    this.decisionContainer = new PIXI.Container();
    this.eventQueue = new PIXI.Text("---");
    this.endTurnButton = new PIXI.Text("End Turn");

    this.setPurchaseContainer()
    this.setResourceContainer()
    this.setDecisionContainer()
    this.setEndTurnButton(g)
    this.setEventQueue()

    g.app.stage.addChild(this.purchaseContainer);
    g.app.stage.addChild(this.resourceContainer);
    g.app.stage.addChild(this.decisionContainer);
    g.app.stage.addChild(this.endTurnButton);
    g.app.stage.addChild(this.eventQueue);
  }

  update(g: Game) {
    this.foodResource.text = `${this.resources["Food"].value}`;
    this.goldResource.text = `${this.resources["Gold"].value}`;
    this.populationResource.text = `${this.resources["Population"].value}`;
    this.turnDisplay.text = `Turn ${this.turnNumber}`;
    this.eventQueue.text = "";

    g.events
      .all()
      .reverse()
      .forEach((e) => {
        this.eventQueue.text += e.display() + "\n";
      });
  }

  private setPurchaseContainer() {
    this.foodPurchase = new PIXI.Text("Purchase 20 food for 5G");
    this.foodPurchase.interactive = true;
    this.foodPurchase.buttonMode = true;
    this.foodPurchase.on("pointerup", () => {
      if (this.resources["Gold"].value < 20) {
        return;
      }
      this.resources["Food"].value += 20;
      this.resources["Gold"].value -= 5;
    });

    this.purchaseContainer.addChild(this.foodPurchase);
  }

  private setResourceContainer() {
    this.resourceContainer.x = 650;

    this.foodResource = new PIXI.Text("XXX FOOD", resourceTextStyles);
    this.foodResource.x = 30;
    this.foodResource.y = 0;

    this.goldResource = new PIXI.Text("XXX GOLD", resourceTextStyles);
    this.goldResource.x = 30;
    this.goldResource.y = 30;

    this.populationResource = new PIXI.Text("XXX POPL", resourceTextStyles);
    this.populationResource.x = 30;
    this.populationResource.y = 60;

    this.turnDisplay = new PIXI.Text("XXX TURN", resourceTextStyles);
    this.turnDisplay.y = 100;

    this.gameSceneAssets.resourceContainerAssets(this.resourceContainer);
    this.resourceContainer.addChild(this.foodResource);
    this.resourceContainer.addChild(this.goldResource);
    this.resourceContainer.addChild(this.populationResource);
    this.resourceContainer.addChild(this.turnDisplay);
  }

  private setDecisionContainer() {
    this.decisionContainer.x = 200;
    this.decisionContainer.y = 300;

    // Create a button for each possible decision available.
    this.decisions.forEach((decision) => {
      let currentOption: PIXI.Text;
      currentOption = new PIXI.Text(decision.name);
      currentOption.interactive = true;
      currentOption.buttonMode = true;

      currentOption.on("pointerup", () => {
        const choiceNumber: number = decision.value;
        const selectedChoiceIndex: number = this.selectedChoices.indexOf(choiceNumber)

        if (selectedChoiceIndex === -1) {
          // Add choice
          this.selectedChoices.unshift(choiceNumber);
        } else {
          // Remove choice
          this.selectedChoices.splice(selectedChoiceIndex, 1);
        }

        // Can't limit arrays in JS so we need to check the length and pop off the last one and push to the front with the new option.
        if (this.selectedChoices.length > 2) {
          this.selectedChoices.pop();
        }

        // Iterate through all choices and highlight only selectedChoices
        this.choices.forEach((choice, index) => {
          if (this.selectedChoices.indexOf(index) === -1) {
            // Choice not selected
            choice.style = defaultChoiceStyle;
          } else {
            // Choice selected
            choice.style = selectedChoiceStyle;
          }
        });
      });

      this.choices.push(currentOption);
    });

    this.choices.forEach((choice, index) => {
      choice.y += 30 * index;
      this.decisionContainer.addChild(choice);
    });
  }

  private setEndTurnButton(g: Game) {
    this.endTurnButton.x = 325;
    this.endTurnButton.y = 500;
    this.endTurnButton.interactive = true;
    this.endTurnButton.buttonMode = true;

    function randomIntFromInterval(minMax: number[]) {
      return Math.floor(
        Math.random() * (minMax[1] - minMax[0] + 1) + minMax[0]
      );
    }

    this.endTurnButton.on("pointerup", () => {
      // Process End of Turn
      // -- Add any bonuses
      // -- Add any "end-of-turn" effects
      // -- Add any penalties
      // --- Generate Beginning of Turn Event\
      // Check to ensure you have chosen your 2 actions.
      console.log(this.selectedChoices);
      if (this.selectedChoices.length() === 2) {
        this.selectedChoices.forEach({
          fn: (choice) => {
            switch (choice) {
              case 0:
                this.resources["Gold"].value += Math.floor(
                  this.resources["Population"].value * BaseTaxRate
                );
                break;
              case 1:
                // code block
                break;
              case 3:
                // code block
                break;
              case 4:
                // code block
                break;
              case 5:
                // code block
                break;
              default:
              // code block
            }
          },
        });

        // First, grow food based on current peasant population. Peasants produce a random amount in a range.
        const foodAmount: number = randomIntFromInterval(BaseFoodProductionRange);
        console.log(
          "You grew " +
            this.resources["Population"].value * foodAmount +
            " this turn."
        );
        this.resources["Food"].value +=
          this.resources["Population"].value * foodAmount;
        // --- Generate Beginning of Turn Event
        // -- Add an Event Log
        if (Math.random() > 0.8) {
          const lostFood: number = Math.ceil(this.resources["Food"].value * 0.2);
          const lostGold: number = Math.ceil(this.resources["Gold"].value * 0.2);
          this.resources["Food"].value -= lostFood;
          this.resources["Gold"].value -= lostGold;
          g.events.add(
            new AttackEvent(
              `You were attacked by bandits! You lost ${lostFood} food and ${lostGold} gold!`
            )
          );
        }

        // Then consume food based on current population. Pop consumes a static amount.
        this.resources["Food"].value -=
          this.resources["Population"].value * FoodConsumptionRate;
        console.log(
          "You consumed " +
            this.resources["Population"].value * FoodConsumptionRate +
            " this turn."
        );

        // TODO: Idea of leaving and starving. Emmigration could mean other players fiefs grow when your people leave. So some starve, some migrate.
        // If you are out of food, 10% will starve.
        if (this.resources["Food"].value <= 0) {
          this.resources["Population"].value -= Math.floor(
            this.resources["Population"].value * PopulationDeathRate
          );
          console.log(
            "Your people are staving and " +
              Math.floor(
                this.resources["Population"].value * PopulationDeathRate
              ) +
              " died"
          );
          this.resources["Food"].value = 0;
          // Otherwise you experience a 20% population growth.
        } else {
          this.resources["Population"].value += Math.floor(
            this.resources["Population"].value * PopulationGrowthRate
          );
        }

        if (this.resources["Population"].value <= 0) {
          this.resources["Population"].value = 0;
        }

        this.turnNumber++;
<<<<<<< HEAD
        this.selectedChoices = [];
        this.choices.forEach(choice => {
          choice.style = defaultChoiceStyle;
        });
=======
        this.selectedChoices.empty();
>>>>>>> Adding SizedSet and Button class to clean up logic.
      } else {
        alert("You must chose 2 actions to end your turn.");
      }
    });
  }

<<<<<<< HEAD
  private setEventQueue() {
    this.eventQueue.y = 525;
  }


=======
    this.endTurnButton.x = 325;
    this.endTurnButton.y = 500;

    this.foodPurchase = new PIXI.Text("Purchase 20 food for 5G");
    this.foodPurchase.interactive = true;
    this.foodPurchase.buttonMode = true;
    this.foodPurchase.on("pointerup", () => {
      if (this.resources["Gold"].value < 20) {
        return;
      }
      this.resources["Food"].value += 20;
      this.resources["Gold"].value -= 5;
    });

    // Create a button for each possible decision available.
    this.decisions.map(({ label, decision }) => {
      let currentOption: Button;
      currentOption = new Button({
        text: decision.name,
        width: 100,
        height: 50,
        isActive: (b) => {
          if (this.selectedChoices.contains(decision.value)) {
            if (b.mouseOver()) {
              b.pixi.style = choiceStyles.selectedHovered;
            } else {
              b.pixi.style = choiceStyles.selected;
            }
          } else {
            if (b.mouseOver()) {
              b.pixi.style = choiceStyles.hover;
            } else {
              b.pixi.style = choiceStyles.default;
            }
          }
        },
        mouseover: NOOP,
        mouseout: NOOP,
        click: (b) => {
          this.selectedChoices.push(decision.value);
        },
      });
      this.choices.push(currentOption);
      return { currentOption, decision };
    });

    this.foodResource = new PIXI.Text("XXX FOOD", {
      fontFamily: "Courier",
      fontWeight: "Bold",
    });
    this.goldResource = new PIXI.Text("XXX GOLD", {
      fontFamily: "Courier",
      fontWeight: "Bold",
    });
    this.goldResource.y = 30;
    this.populationResource = new PIXI.Text("XXX POPL", {
      fontFamily: "Courier",
      fontWeight: "Bold",
    });
    this.populationResource.y = 60;

    this.foodResource = new PIXI.Text("XXX FOOD", {
      fontFamily: "Courier",
      fontWeight: "Bold",
    });

    this.turnDisplay = new PIXI.Text("XXX TURN", {
      fontFamily: "Courier",
      fontWeight: "Bold",
    });
    this.turnDisplay.y = 100;

    this.purchaseContainer.addChild(this.foodPurchase);
    this.resourceContainer.addChild(this.foodResource);
    this.resourceContainer.addChild(this.goldResource);
    this.resourceContainer.addChild(this.populationResource);
    this.resourceContainer.addChild(this.turnDisplay);
    this.resourceContainer.x = 650;

    this.choices.forEach((choice, index) => {
      choice.setY(30 * index);
      this.decisionContainer.addChild(choice.pixi);
    });
    this.decisionContainer.x = 200;
    this.decisionContainer.y = 300;

    g.app.stage.addChild(this.purchaseContainer);
    g.app.stage.addChild(this.resourceContainer);
    g.app.stage.addChild(this.decisionContainer);
    g.app.stage.addChild(this.endTurnButton);
    g.app.stage.addChild(this.eventQueue);
  }

  update(g: Game) {
    this.choices.map((b) => b.update());
    this.foodResource.text = `${this.resources["Food"].value} ${this.resources["Food"].name}`;
    this.goldResource.text = `${this.resources["Gold"].value} ${this.resources["Gold"].name}`;
    this.populationResource.text = `${this.resources["Population"].value} ${this.resources["Population"].name}`;
    this.turnDisplay.text = `Turn ${this.turnNumber}`;

    this.eventQueue.text = "";
    g.events
      .all()
      .reverse()
      .forEach((e) => {
        this.eventQueue.text += e.display() + "\n";
      });
  }
>>>>>>> Adding SizedSet and Button class to clean up logic.
}
