import {
  Jewellery,
  JewelleryStorage,
  Necklace,
  PendantNecklace,
} from "./jewellery";

interface Packer<T extends Jewellery> {
  pick(item: Jewellery): item is T;
  pack(item: T): void;
}

const safePacker = (storage: JewelleryStorage): Packer<Jewellery> => ({
  pick(item: Jewellery): item is Jewellery {
    return item.stone === "Diamond";
  },
  pack: (item: Jewellery) => storage.safe.push(item),
});

const smallItemPacker = (storage: JewelleryStorage): Packer<Jewellery> => ({
  pick(item: Jewellery): item is Jewellery {
    return item.size() === "Small";
  },
  pack: (item: Jewellery) => storage.box.topShelf.push(item),
});

const defaultNecklacePacker = (
  storage: JewelleryStorage
): Packer<Necklace> => ({
  pick: (item: Jewellery): item is Necklace => item._kind === "Necklace",
  pack: (item) => storage.tree.push(item),
});

const pendantNecklacePacker = (
  storage: JewelleryStorage
): Packer<PendantNecklace> => ({
  pick: (x): x is PendantNecklace =>
    x._kind === "Necklace" && x.type === "Pendant",
  pack: (x) => {
    storage.tree.push(x.chain);
    storage.box.topShelf.push(x.pendant);
  },
});

export function packNecklace(
  item: Necklace | PendantNecklace,
  storage: JewelleryStorage
) {
  [safePacker, smallItemPacker, pendantNecklacePacker, defaultNecklacePacker]
    .map((p) => p(storage))
    .find((p) => p.pick(item))
    .pack(item);
}

export function pack(item: Jewellery, storage: JewelleryStorage) {
  if (storage.travelRoll.includes(item) && item.size() !== "Large")
    storage.box.topShelf.push(item);
  else if (item.stone === "Diamond") {
    storage.safe.push(item);
  } else if (item.size() === "Small") {
    storage.box.topShelf.push(item);
  } else if (item._kind === "Earring" && item.type === "Hoop") {
    storage.tree.push(item);
  } else if (
    item._kind === "Earring" &&
    (item.type === "Drop" || item.stone !== "Plain")
  ) {
    storage.box.topShelf.push(item);
  } else if (item._kind === "Earring" && item.type === "Drop") {
    storage.box.mainSection.push(item);
  } else if (item._kind === "Necklace" && item.type === "Pendant") {
    storage.tree.push(item.chain);
    storage.box.topShelf.push(item.pendant);
  } else if (item._kind === "Necklace") {
    storage.tree.push(item);
  } else {
    storage.dresserTop.push(item);
  }

  if (storage.travelRoll.includes(item))
    storage.travelRoll = storage.travelRoll.filter((x) => x !== item);
}

export function makeStorage(): JewelleryStorage {
  return {
    box: {
      mainSection: [],
      topShelf: [],
      ringCompartment: [],
    },

    safe: [],
    tree: [],
    dresserTop: [],
    travelRoll: [],
  };
}
