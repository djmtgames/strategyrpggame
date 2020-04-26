import Scene from "./Scene";
import * as PIXI from "pixi.js";
import { Game } from "../Game";

interface Resource {
  name: string;
  value: number;
}

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
  foodPurchase: PIXI.Text;
  purchaseContainer: PIXI.Container;
  resourceContainer: PIXI.Container;
  foodResource: PIXI.Text;
  goldResource: PIXI.Text;
  populationResource: PIXI.Text;
  endTurnButton: any;
  create(g: Game) {
    this.resources = { Food, Population, Happiness, Gold };
    this.purchaseContainer = new PIXI.Container();
    this.resourceContainer = new PIXI.Container();

    this.endTurnButton = new PIXI.Text("End Turn");
    this.endTurnButton.interactive = true;
    this.endTurnButton.buttonMode = true;
    this.endTurnButton.on("pointerup", () => {
      // Process End of Turn
      // -- Add any bonuses
      // -- Add any "end-of-turn" effects
      // -- Add any penalties
      // --- Generate Beginning of Turn Event
      if (Math.random() > 0.8) {
        this.resources["Food"].value -= Math.ceil(
          this.resources["Food"].value * 0.2
        );
        this.resources["Gold"].value -= Math.ceil(
          this.resources["Gold"].value * 0.2
        );
      }

      this.resources["Food"].value -= this.resources["Population"].value;
      this.resources["Gold"].value += Math.floor(
        this.resources["Population"].value / 5
      );

      if (this.resources["Food"].value <= 0) {
        this.resources["Population"].value -= 1;
        this.resources["Food"].value = 0;
      } else {
        this.resources["Population"].value += Math.floor(
          this.resources["Population"].value * 0.2
        );
      }

      if (this.resources["Population"].value <= 0) {
        this.resources["Population"].value = 0;
      }
    });

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

    this.foodResource = new PIXI.Text("XXX FOOD", {
      fontFamily: "Courier",
      fontWeight: "Bold",
    });
    this.goldResource = new PIXI.Text("XXX GOLD", {
      fontFamily: "Courier",
      fontWeight: "Bold",
    });
    this.goldResource.y = 25;
    this.populationResource = new PIXI.Text("XXX POPL", {
      fontFamily: "Courier",
      fontWeight: "Bold",
    });
    this.populationResource.y = 50;

    this.purchaseContainer.addChild(this.foodPurchase);
    this.resourceContainer.addChild(this.foodResource);
    this.resourceContainer.addChild(this.goldResource);
    this.resourceContainer.addChild(this.populationResource);
    this.resourceContainer.x = 650;

    g.app.stage.addChild(this.purchaseContainer);
    g.app.stage.addChild(this.resourceContainer);
    g.app.stage.addChild(this.endTurnButton);
  }

  update(g: Game) {
    this.foodResource.text = `${this.resources["Food"].value} ${this.resources["Food"].name}`;
    this.goldResource.text = `${this.resources["Gold"].value} ${this.resources["Gold"].name}`;
    this.populationResource.text = `${this.resources["Population"].value} ${this.resources["Population"].name}`;
  }
}
