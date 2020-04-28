import Scene from "./Scene";
import * as PIXI from "pixi.js";
import { Game } from "../Game";
import GameSceneAssets from "../assets/GameSceneAssets";
import AttackEvent from "../events/AttackEvent";
import SizedSet from "../utils/SizedSet";
import { Button } from "../components/Button";
import ScrollBox from "../components/ScrollBox";
import GameErrorEvent from "../events/GameErrorEvent";

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
const BaseFoodProductionRange: [number, number] = [8, 12];
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
});

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
  eventQueue: ScrollBox = new ScrollBox({ onUpdate: NOOP });
  gameSceneAssets: GameSceneAssets = new GameSceneAssets();

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
    this.gameSceneAssets = new GameSceneAssets();
    this.selectedChoices = new SizedSet(2);
    this.purchaseContainer = new PIXI.Container();
    this.resourceContainer = new PIXI.Container();
    this.decisionContainer = new PIXI.Container();
    this.eventQueue = new ScrollBox({ onUpdate: NOOP });
    this.endTurnButton = new Button({
      text: "End Turn",
      width: Button.AUTO,
      height: 25,
      isActive: (b) => {
        if (b.mouseOver() && b.mouseDown()) {
          b.pixi.style = choiceStyles.selectedHovered;
        } else if (b.mouseOver()) {
          b.pixi.style = choiceStyles.hover;
        } else {
          b.pixi.style = choiceStyles.default;
        }
      },
      mouseover: NOOP,
      mouseout: NOOP,
      click: NOOP,
    });

    this.setPurchaseContainer();
    this.setResourceContainer();
    this.setDecisionContainer();
    this.setEndTurnButton(g);

    g.app.stage.addChild(this.purchaseContainer);
    g.app.stage.addChild(this.resourceContainer);
    g.app.stage.addChild(this.decisionContainer);
    this.endTurnButton.addToStage(g);
    this.eventQueue.addToStage(g);
  }

  update(g: Game) {
    this.foodResource.text = `${this.resources["Food"].value}`;
    this.goldResource.text = `${this.resources["Gold"].value}`;
    this.populationResource.text = `${this.resources["Population"].value}`;
    this.turnDisplay.text = `Turn ${this.turnNumber}`;
    this.eventQueue.messages = g.events.all().map((x) => x.display());
    this.eventQueue.update();
    this.endTurnButton.update();
    this.choices.map((b) => b.update());
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
    this.decisions.map(({ label, decision }, idx) => {
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
        mouseout: NOOP,
        mouseover: NOOP,
        click: (b) => {
          this.selectedChoices.push(decision.value);
        },
      });
      currentOption.setY(25 * idx);
      this.decisionContainer.addChild(currentOption.pixi);
      this.choices.push(currentOption);
      return { currentOption, decision };
    });
  }

  private setEndTurnButton(g: Game) {
    this.endTurnButton.setX(325).setY(500);

    function randomIntFromInterval(minMax: [number, number]) {
      return Math.floor(
        Math.random() * (minMax[1] - minMax[0] + 1) + minMax[0]
      );
    }

    this.endTurnButton.onClick(() => {
      // Process End of Turn
      // -- Add any bonuses
      // -- Add any "end-of-turn" effects
      // -- Add any penalties
      // --- Generate Beginning of Turn Event\
      // Check to ensure you have chosen your 2 actions.
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
        const foodAmount: number = randomIntFromInterval(
          BaseFoodProductionRange
        );
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
          const lostFood: number = Math.ceil(
            this.resources["Food"].value * 0.2
          );
          const lostGold: number = Math.ceil(
            this.resources["Gold"].value * 0.2
          );
          this.resources["Food"].value -= lostFood;
          this.resources["Gold"].value -= lostGold;
          g.events.add(
            new AttackEvent(
              `[Turn ${this.turnNumber}] You were attacked by bandits! You lost ${lostFood} food and ${lostGold} gold!`
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
        this.selectedChoices.empty();
        this.choices.forEach((x) => x.update());
      } else {
        g.events.add(
          new GameErrorEvent("You must chose 2 actions to end your turn.")
        );
      }
    });
  }
}
