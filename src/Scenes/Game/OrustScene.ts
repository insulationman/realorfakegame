import { GameObjects, Tilemaps } from "phaser";

// import themeSongUrl from "../../Assets/Audio/theme.mp3";
import AnimatedTiles from "phaser-animated-tiles-phaser3.5/dist/AnimatedTiles.min.js";
import playerSpriteSheetUrl from "../../Assets/SpriteSheets/mage_f.png";
import fireStripUrl from "../../Assets/SpriteSheets/sFire_strip5_32x32.png";
import playerSpriteUrl from "../../Assets/Sprites/player.png";
import tileMapJsonUrl from "../../Assets/Tilemaps/Orust/Orust.json?url";
import tilePngUrl from "../../Assets/Tilemaps/Tiles/Serene_Village_32x32.png";
import { Dialog } from "../../Classes/Dialog";
import { Player } from "../../Classes/Player";
import { AddObjectsFromObjectLayer } from "../../Helpers/TileHelpers";

export default class OrustScene extends Phaser.Scene {
  constructor() {
    super("orust-scene");
  }
  private map!: Tilemaps.Tilemap;
  private player!: Player;
  private animatedTiles!: AnimatedTiles;

  private groundlayer!: Tilemaps.TilemapLayer;
  private waterlayer!: Tilemaps.TilemapLayer;
  private dynamiclayer!: Tilemaps.TilemapLayer;
  private toplayer!: Tilemaps.TilemapLayer;
  private mushrooms!: Phaser.Physics.Arcade.StaticGroup;
  private collidingobjectslayer!: Tilemaps.TilemapLayer;
  private noncollidingobjectslayer!: Tilemaps.TilemapLayer;
  private noncollidinghigherlayer!: Tilemaps.TilemapLayer;
  private house!: GameObjects.GameObject;
  private websocket!: WebSocket;
  private lastUpdate = 0;
  private ghost!: GameObjects.Sprite;

  preload() {
    this.cameras.main.setBackgroundColor("#696969");
    //Load tilemap
    this.load.tilemapTiledJSON("Ground", tileMapJsonUrl);

    //Load tileset
    this.load.image("tiles", tilePngUrl);
    this.load.image("fire", fireStripUrl);
    //Load player
    this.load.image("player", playerSpriteUrl);
    // this.load.audio("music", themeSongUrl);
    this.load.spritesheet("playerspritesheet", playerSpriteSheetUrl, {
      frameWidth: 32,
      frameHeight: 36,
    });
    this.load.spritesheet("tilesspritesheet", tilePngUrl, {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.scenePlugin(
      "animatedTiles",
      AnimatedTiles,
      "animatedTiles",
      "animatedTiles"
    );
  }

  create() {
    this.player = new Player(this, 300, 500);
    this.initMap();
    this.initGhost();

    // this.initMusic();
    this.initCollidingActions();
    //get the animated tiles plugin
    this.animatedTiles.init(this.map);
    this.initMushrooms();
    //create a dialog
    const dialog = new Dialog("Holy shit, a dialog box!");
  }

  update() {
    this.player.updatePlayer();
    //send update message every half second
    this.sendCoords();
  }

  private initMusic(): void {
    const music = this.sound.add("music");
    music.play();
  }

  private initMap(): void {
    //add the tilemap
    this.map = this.add.tilemap("Ground");
    //add the tileset
    this.map.addTilesetImage("villagetileset", "tiles");
    this.map.addTilesetImage("Firestrip", "fire");
    //create the layer
    this.groundlayer = this.map.createLayer("Ground", "villagetileset", 0, 0);
    this.waterlayer = this.map.createLayer("Under", "villagetileset", 0, 0);
    this.dynamiclayer = this.map.createLayer("Dynamic", "Firestrip", 0, 0);
    this.toplayer = this.map.createLayer("Top", "villagetileset", 0, 0);
    this.toplayer.setDepth(200);
    //load collision objects
    this.collidingobjectslayer = this.map.createLayer(
      "Colliders",
      "villagetileset",
      0,
      0
    );
    this.map.setCollisionBetween(1, 10000, true, false, "Colliders");
    this.physics.add.collider(this.player, this.collidingobjectslayer);
  }

  private initMushrooms(): void {
    const shrooms = AddObjectsFromObjectLayer(
      this,
      this.map,
      "Mushrooms",
      "tilesspritesheet"
    );
    //add overlay trigger for all mushrooms
    shrooms.children.iterate((shroom) => {
      this.physics.add.overlap(this.player, shroom, () => {
        this.mushroomPickupCallback(shroom);
      });
    });
  }

  private mushroomPickupCallback(shroom: Phaser.GameObjects.GameObject): void {
    //remove the mushroom from the display list
    shroom.destroy();
    //we can add more logic here, like adding the mushroom to the player's inventory
  }

  private initCollidingActions(): void {
    const objects = this.map.createFromObjects("Interactive", {
      name: "house",
    });

    const house = objects[0];
    //set the global variable house if house is not null
    //make the object transparent

    if (house) {
      this.house = house;
      this.physics.world.enable(house);
      house.removeFromDisplayList();
      //alert when the player collides with the house
      this.physics.add.overlap(this.player, house, () => {
        this.events.emit("player-enter-house");
        this.scene.switch("castle-scene");
      });
    }
  }

  private initHigherLayers(): void {
    this.noncollidinghigherlayer = this.map.createLayer(
      "NonCollidingCanWalkUnder",
      "villagetileset",
      0,
      0
    );
  }

  private initGhost(): void {
    this.websocket = new WebSocket("wss://realorfakehub.azurewebsites.net");
    // this.websocket = new WebSocket("ws://localhost:5087");

    this.websocket.onmessage = (event) => {
      if (this.ghost === undefined) {
        this.ghost = this.add.sprite(0, 0, "playerspritesheet", 0);
      }
      const data = JSON.parse(event.data);
      if (data.type === "player") {
        this.ghost.setX(data.playerCoords.x);
        this.ghost.setY(data.playerCoords.y);
      }
    };

    this.websocket.onopen = () => {
      console.log("websocket opened");

      this.ghost.setDepth(100);
      this.ghost.setTint(0x555555);
    };

    this.websocket.onclose = () => {
      console.log("websocket closed");
      this.ghost.destroy();
    };

    this.websocket.onerror = (error) => {
      console.log(error);
    };
  }

  private sendCoords(): void {
    if (this.lastUpdate + 50 < Date.now()) {
      if (
        this.websocket.readyState === 1 &&
        (this.player.body.velocity.x !== 0 ||
          this.player.body.velocity.y !== 0) &&
        //check so websocket is not already sending some message
        this.websocket.bufferedAmount === 0
      ) {
        if (this.player)
          this.websocket.send(
            JSON.stringify({
              type: "player",
              playerCoords: {
                x: this.player.x,
                y: this.player.y,
              },
            })
          );
      }
      this.lastUpdate = Date.now();
    }
  }
}
