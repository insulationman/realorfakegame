import { Tilemaps } from "phaser";

// import themeSongUrl from "../../Assets/Audio/theme.mp3";
import playerSpriteSheetUrl from "../../Assets/SpriteSheets/mage_f.png";
import playerSpriteUrl from "../../Assets/Sprites/player.png";
import tileMapJsonUrl from "../../Assets/Tilemaps/Orust/Orust.json?url";
import tilePngUrl from "../../Assets/Tilemaps/Tiles/Serene_Village_32x32.png";
import { Player } from "../../Classes/Player";

export default class OrustScene extends Phaser.Scene {
  constructor() {
    super("orust-scene");
  }
  private map!: Tilemaps.Tilemap;
  private player!: Player;

  private groundlayer!: Tilemaps.TilemapLayer;
  private waterlayer!: Tilemaps.TilemapLayer;
  private collidingobjectslayer!: Tilemaps.TilemapLayer;
  private noncollidingobjectslayer!: Tilemaps.TilemapLayer;
  private noncollidinghigherlayer!: Tilemaps.TilemapLayer;

  preload() {
    this.cameras.main.setBackgroundColor("#FFFFFF");
    //Load tilemap
    this.load.tilemapTiledJSON("Ground", tileMapJsonUrl);
    //Load tileset
    this.load.image("tiles", tilePngUrl);
    //Load player
    this.load.image("player", playerSpriteUrl);
    // this.load.audio("music", themeSongUrl);
    this.load.spritesheet("playerspritesheet", playerSpriteSheetUrl, {
      frameWidth: 32,
      frameHeight: 36,
    });
  }

  create() {
    this.player = new Player(this, 200, 100);
    this.initMap();
    // this.initMusic();
    this.initCollidingActions();
  }

  update() {
    this.player.updatePlayer();
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
    //create the layer
    this.groundlayer = this.map.createLayer("Ground", "villagetileset", 0, 0);
  }

  private initCollidingActions(): void {
    const objects = this.map.createFromObjects("Interactive", {
      name: "house",
    });

    const house = objects[0];
    //make the object transparent

    if (house) {
      this.physics.world.enable(house);
      //alert when the player collides with the house
      this.physics.add.overlap(this.player, house, () => {
        this.scene.start("hagudden-scene");
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
}
