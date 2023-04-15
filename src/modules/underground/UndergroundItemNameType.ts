/*
To update this type when adding new items:

Open the game, and run the following code in the browser console

copy(`type UndergroundItemNameType
    = ${[...new Set(Object.values(UndergroundItems.list).map(i => i.name))].map(i => `'${i.replace(/'/g, "\\'")}'`).join('\n    | ')};`);

Replace the everything in this file (except for this comment) with what was copied
*/

type UndergroundItemNameType
    = 'Rare Bone'
    | 'Star Piece'
    | 'Revive'
    | 'Max Revive'
    | 'Iron Ball'
    | 'Heart Scale'
    | 'Light Clay'
    | 'Odd Keystone'
    | 'Hard Stone'
    | 'Oval Stone'
    | 'Everstone'
    | 'Smooth Rock'
    | 'Heat Rock'
    | 'Icy Rock'
    | 'Damp Rock'
    | 'Draco Plate'
    | 'Dread Plate'
    | 'Earth Plate'
    | 'Fist Plate'
    | 'Flame Plate'
    | 'Icicle Plate'
    | 'Insect Plate'
    | 'Iron Plate'
    | 'Meadow Plate'
    | 'Mind Plate'
    | 'Sky Plate'
    | 'Splash Plate'
    | 'Spooky Plate'
    | 'Stone Plate'
    | 'Toxic Plate'
    | 'Zap Plate'
    | 'Pixie Plate'
    | 'Blank Plate'
    | 'Helix Fossil'
    | 'Dome Fossil'
    | 'Old Amber'
    | 'Root Fossil'
    | 'Claw Fossil'
    | 'Armor Fossil'
    | 'Skull Fossil'
    | 'Cover Fossil'
    | 'Plume Fossil'
    | 'Jaw Fossil'
    | 'Sail Fossil'
    | 'Fossilized Bird'
    | 'Fossilized Fish'
    | 'Fossilized Drake'
    | 'Fossilized Dino'
    | 'Fire Stone'
    | 'Water Stone'
    | 'Thunder Stone'
    | 'Leaf Stone'
    | 'Moon Stone'
    | 'Sun Stone'
    | 'Shiny Stone'
    | 'Dusk Stone'
    | 'Dawn Stone'
    | 'Ice Stone'
    | 'Red Shard'
    | 'Yellow Shard'
    | 'Green Shard'
    | 'Blue Shard'
    | 'Grey Shard'
    | 'Purple Shard'
    | 'Ochre Shard'
    | 'Black Shard'
    | 'Crimson Shard'
    | 'Lime Shard'
    | 'White Shard'
    | 'Pink Shard'
    | 'Cyan Shard'
    | 'Rose Shard'
    | 'Brown Shard';
    //| 'Beige Shard';

export default UndergroundItemNameType;
