import Scene from "./Scene";
import { Game } from "../Game";
import GameSceneAssets from "../assets/GameSceneAssets";
import { MapAsset, BlankMapAsset } from "../assets/MapAsset";
import AttackEvent from "../events/AttackEvent";
import SizedSet from "../utils/SizedSet";
import { Button, BlankButton } from "../ui/Button";
import ScrollBox from "../ui/ScrollBox";
import GameErrorEvent from "../events/GameErrorEvent";
import { NOOP } from "../utils/Utils";
import Container from "../ui/Container";
import Label from "../ui/Label";
import Style from "../ui/Style";
import StateManager from "../StateManager";
import { collectTaxes } from "../core/decisions/CollectTaxes";
import {
  populationGrowth,
  growFood,
  consumeFood,
  isPopulationStarving,
  calcualeStarvationDeaths,
} from "../core/actions/actions";
import { trainTroops } from "../core/decisions/trainTroops";
import { buyFood } from "../core/decisions/buyFood";

interface Resource {
  name: string;
  value: any;
}

interface Decision {
  name: string;
  value: number;
}

let state = new StateManager();

let Peasants = {
  name: "Peasants",
  value: state.register("peasants", 20),
};

let Food = {
  name: "Food",
  value: state.register("food", 1000),
};

let Soldiers = {
  name: "Soldiers",
  value: state.register("soldiers", 10),
};

let Happiness = {
  name: "Happiness",
  value: state.register("happiness", 100),
};

let Gold = {
  name: "Gold",
  value: state.register("gold", 100),
};

const choiceStyles = {
  default: Style.from({ fill: "black" }),
  hover: Style.from({ fill: "white" }),
  selected: Style.from({ fill: "yellow" }),
  selectedHovered: Style.from({ fill: "red" }),
};

const resourceTextStyles = Style.from({
  fontFamily: "Courier",
  fontWeight: "Bold",
});

// Currently no programmatic link between these and the decision functions. Should merge these at somepoint? This hard link is fragile.
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
    name: "Sell food",
    value: 4,
  },
  {
    name: "Buy food",
    value: 5,
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
  resources: { [x: string]: Resource } = {};
  decisions: { label: Button; decision: Decision }[] = [];
  mapAssetContainer: Container = new Container();
  purchaseContainer: Container = new Container();
  decisionContainer: Container = new Container();
  resourceContainer: Container = new Container();
  buildingsContainer: Container = new Container();
  foodResource: Label = new Label();
  goldResource: Label = new Label();
  turnDisplay: Label = new Label();
  peasantResource: Label = new Label();
  soldierResource: Label = new Label();
  choices: Button[] = [];
  selectedChoices: SizedSet<number> = new SizedSet(2);
  eventQueue: ScrollBox = new ScrollBox({ onUpdate: NOOP });
  gameSceneAssets: GameSceneAssets = new GameSceneAssets();
  endTurnButton: any;
  foodPurchase: Button = BlankButton;
  mapAsset: MapAsset = BlankMapAsset;
  turnNumber: number = 0;

  create(g: Game) {
    this.resources = { Food, Soldiers, Happiness, Gold, Peasants };
    this.decisions = baseDecisions.map((x) => ({
      label: BlankButton,
      decision: x,
    }));
    this.choices = [];
    this.turnNumber = 1;
    this.gameSceneAssets = new GameSceneAssets();
    this.selectedChoices = new SizedSet(2);
    this.eventQueue = new ScrollBox({ onUpdate: NOOP });
    this.endTurnButton = new Button({
      text: "End Turn",
      width: Button.AUTO,
      height: 25,
      isActive: (b) => {
        if (b.mouseOver() && b.mouseDown()) {
          b.setStyle(choiceStyles.selectedHovered);
        } else if (b.mouseOver()) {
          b.setStyle(choiceStyles.hover);
        } else {
          b.setStyle(choiceStyles.default);
        }
      },
      mouseover: NOOP,
      mouseout: NOOP,
      click: NOOP,
    });

    this.setMapAssetContainer(g);
    this.setResourceContainer();
    this.setDecisionContainer();
    this.setEndTurnButton(g);

    this.mapAssetContainer.addToStage(g);
    this.purchaseContainer.addToStage(g);
    this.decisionContainer.addToStage(g);
    this.resourceContainer.addToStage(g);
    this.endTurnButton.addToStage(g);
    this.eventQueue.addToStage(g);
  }

  update(g: Game) {
    this.foodResource.setText(`${state.fetch("food")} Food`);
    this.goldResource.setText(`${state.fetch("gold")} Gold`);
    this.peasantResource.setText(`${state.fetch("peasants")} Peasants`);
    this.soldierResource.setText(`${state.fetch("soldiers")} Soldiers`);
    this.turnDisplay.setText(`Turn ${this.turnNumber}`);
    this.eventQueue.messages = g.events.all().map((x) => x.display());
    this.eventQueue.update();
    this.endTurnButton.update();
    this.choices.map((b) => b.update());
  }

  private setMapAssetContainer(g: Game) {
    this.mapAsset = new MapAsset(g.app);
    this.mapAssetContainer.add(this.mapAsset);
  }

  private setResourceContainer() {
    this.resourceContainer.setX(650);

    this.foodResource = Label.from("XXX FOOD")
      .setStyle(resourceTextStyles)
      .setX(30);

    this.goldResource = Label.from("XXX GOLD")
      .setStyle(resourceTextStyles)
      .setX(30)
      .setY(30);

    this.peasantResource = Label.from("XXX PEAS")
      .setStyle(resourceTextStyles)
      .setX(30)
      .setY(60);

    this.soldierResource = Label.from("XXX SOLD")
      .setStyle(resourceTextStyles)
      .setX(30)
      .setY(90);

    this.turnDisplay = Label.from("XXX TURN")
      .setStyle(resourceTextStyles)
      .setX(30)
      .setY(120);

    this.gameSceneAssets.resourceContainerAssets(this.resourceContainer);
    this.resourceContainer.add(this.foodResource);
    this.resourceContainer.add(this.goldResource);
    this.resourceContainer.add(this.soldierResource);
    this.resourceContainer.add(this.peasantResource);
    this.resourceContainer.add(this.turnDisplay);
  }

  private setDecisionContainer() {
    this.decisionContainer.setX(200).setY(300);
    this.decisions.map(({ label, decision }, idx) => {
      let currentOption: Button;
      currentOption = new Button({
        text: decision.name,
        width: 100,
        height: 50,
        isActive: (b) => {
          if (this.selectedChoices.contains(decision.value)) {
            if (b.mouseOver()) {
              b.setStyle(choiceStyles.selectedHovered);
            } else {
              b.setStyle(choiceStyles.selected);
            }
          } else {
            if (b.mouseOver()) {
              b.setStyle(choiceStyles.hover);
            } else {
              b.setStyle(choiceStyles.default);
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
      this.decisionContainer.add(currentOption);
      this.choices.push(currentOption);
      return { currentOption, decision };
    });
  }

  private setEndTurnButton(g: Game) {
    this.endTurnButton.setX(325).setY(500);
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
                state.increment("gold", collectTaxes(state));
                break;
              case 1:
                // code block
                break;
              case 2:
                trainTroops(state);
                break;
              case 3:
                // code block
                break;
              case 4:
                // code block
                break;
              case 5:
                buyFood(state);
                break;
              default:
              // code block
            }
          },
        });

        // First, grow food based on current peasant population.
        state.increment("food", growFood(state));

        // Then consume food based on current population.
        state.decrement("food", consumeFood(state));

        // TODO: Idea of leaving and starving. Emmigration could mean other players fiefs grow when your people leave. So some starve, some migrate.
        // If you are out of food, people starve!
        if (isPopulationStarving(state)) {
          const starvedPopulation =  calcualeStarvationDeaths(state);
          state.decrement("peasants", starvedPopulation.starvedPeasants);
          state.decrement("soldiers", starvedPopulation.starvedSoldiers);
          // Food can't go negative. 
          state.update("food", 0);
        // Otherwise you experience population growth.
        } else {
          state.increment("peasants", populationGrowth(state));
        }

        this.turnNumber++;
        this.selectedChoices.empty();
        console.log(state);
      } else {
        g.events.add(
          new GameErrorEvent("You must chose 2 actions to end your turn.")
        );
      }
    });
  }
}
