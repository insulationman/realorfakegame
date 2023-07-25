// import { Tilemaps } from "phaser";

import { Tilemaps } from "phaser";

export function AddObjectsFromObjectLayer(
  scene: Phaser.Scene,
  map: Tilemaps.Tilemap,
  objectLayerName: string,
  spritesheetName: string
): Phaser.Physics.Arcade.StaticGroup {
  const group = scene.physics.add.staticGroup();
  const objects = map.getObjectLayer(objectLayerName)["objects"];
  //add all objects in the layer and add them to the mushrooms list
  objects.forEach((object) => {
    const tileArtId = object["gid"] ? object["gid"] - 1 : 0;
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
