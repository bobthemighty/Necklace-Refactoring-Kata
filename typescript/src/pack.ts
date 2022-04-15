import {
  Jewellery,
  JewelleryStorage,
  Necklace,
  PendantNecklace,
} from "./jewellery";

export function packNecklace(
  item: Necklace | PendantNecklace,
  storage: JewelleryStorage
) {
  storage.push(item);
}

export function pack(item: Jewellery, storage: JewelleryStorage) {
  if (storage.travelRoll.includes(item) && item.kind === "Ring")
    storage.box.ringCompartment.push(item);
  else if (storage.travelRoll.includes(item) && item.size() !== "Large")
    storage.box.topShelf.push(item);
  else if (item.stone === "Diamond") storage.safe.push(item);
  else if (item.kind === "Ring") storage.box.ringCompartment.push(item);
  else if (item.size() === "Small") storage.box.topShelf.push(item);
  else if (item.kind === "Earring") {
    if (item.type === "Hoop") storage.tree.push(item);
    else if (item.type === "Drop" && item.stone !== "Plain")
      storage.box.topShelf.push(item);
    else if (item.type === "Drop") storage.box.mainSection.push(item);
  } else if (item.kind === "Necklace") {
    if (item.type === "Beads" || item.type === "Chain") storage.tree.push(item);
    else if (item.type === "Pendant") {
      storage.tree.push(item.chain);
      storage.box.topShelf.push(item.pendant);
    }
  } else {
    storage.dresserTop.push(item);
  }

  if (storage.travelRoll.includes(item))
    storage.travelRoll = storage.travelRoll.filter((x) => x !== item);
}
