// import { Tilemaps } from "phaser";

import { Tilemaps } from "phaser";

export function AddObjectsFromObjectLayer(
  scene: Phaser.Scene,
  map: Tilemaps.Tilemap,
  objectLayerName: string,
  spritesheetName: string
): Phaser.Physics.Arcade.StaticGroup {
  //create a group of static arcade objects that is added to the scene.
  const group = scene.physics.add.staticGroup();
  //get all objects contained in the specified object layer
  const objects = map.getObjectLayer(objectLayerName)["objects"];
  //add all objects in the layer to the group of static arcade objects
  objects.forEach((object) => {
    //get the tile image number of the tile (e.g. the image of a mushroom that is on the 605th frame of the image sheet)
    const tileArtId = object["gid"] ? object["gid"] - 1 : 0;
    //then create an object that uses the spritesheet (the image containing all tile artwork), and the frame related to this specific tile.
    group.create(object.x, object.y, spritesheetName, tileArtId);
  });
  return group;
}

// export function FindTilesByType(
//   map: Tilemaps.Tilemap,
//   layer: Tilemaps.ObjectLayer,
//   objectType: string
// ) {
//   //get all objects in the layer by looking for objects with the type property set to the objectType parameter
//   const objects = map.filterObjects(
//     layer,
//     (obj: any) => obj.type === objectType
//   );
//   //convert all objects to tiles
//   const tiles = objects.map((obj: any) => {
//     const tile = map.getTileAt(obj.x, obj.y);
//     return tile;
//   });
//   return tiles;
// }
