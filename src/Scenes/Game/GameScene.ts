import { Tilemaps } from "phaser";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("game-scene");
  }

  preload() {
    // this.load.image({
    //   key: "tiles",
    //   url: "src/Assets/Tilemaps/Tiles/tiles.png",
    // });
    // this.load.tilemapTiledJSON("map", "src/Assets/Tilemaps/Json/Map.json");

    this.load.tilemapTiledJSON(
      "Ground",
      "src/Assets/Tilemaps/Json/hagudden-1.json"
    );

    //  Next we load the tileset. This is just an image, loaded in via the normal way we load images:

    this.load.image(
      "tiles",
      "src/Assets/Tilemaps/Tiles/Serene_Village_32x32.png"
    );
  }

  create() {
    this.initMap();
    // this. = new Player(this, 100, 100);
  }

  private map!: Tilemaps.Tilemap;
  // private tileset!: Tilemaps.Tileset;
  // private wallsLayer!: Tilemaps.TilemapLayer;
  // private groundLayer!: Tilemaps.TilemapLayer;
  private layer!: Tilemaps.TilemapLayer;

  private initMap(): void {
    // this.scene..backgroundColor = '#787878';

    //  The 'mario' key here is the Loader key given in game.load.tilemap
    this.map = this.add.tilemap("Ground");

    //  The first parameter is the tileset name, as specified in the Tiled map editor (and in the tilemap json file)
    //  The second parameter maps this name to the Phaser.Cache key 'tiles'
    this.map.addTilesetImage("villagetileset", "tiles");

    this.layer = this.map.createLayer("Ground", "villagetileset", 0, 0);
    // this.map = this.make.tilemap({
    //   key: "map",
    // });

    // this.tileset = this.map.addTilesetImage("Map", "tiles", 16, 16, 0, 0);
    // this.groundLayer = this.map.createLayer("Ground", this.tileset, 0, 0);
    // console.log(this.groundLayer);
    // this.wallsLayer = this.map.createLayer("Walls", this.tileset, 0, 0);
    // this.physics.world.setBounds(
    //   0,
    //   0,
    //   this.wallsLayer.width,
    //   this.wallsLayer.height
    // );
  }
}
