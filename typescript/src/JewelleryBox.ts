import { Jewellery } from "./jewellery";

export interface JewelleryBox {
  ringCompartment: Array<Jewellery>;
  topShelf: Storage;
  mainSection: Array<Jewellery>;
}

export interface JewelleryStorage extends Storage {
  box: JewelleryBox;
  tree: Storage;
  travelRoll: Array<Jewellery>;
  safe: Storage;
  dresserTop: Array<Jewellery>;
}

const isDropEarring = (x: Jewellery) =>
  x.kind === "Earring" && x.type === "Drop" && x.stone !== "Plain";

export const makeStorage = (): JewelleryStorage => {
  const travelRoll: Array<Jewellery> = [];
  return {
    box: {
      ringCompartment: [],
      topShelf: new LeafStorage(
        (x) =>
          x.size() === "Small" ||
          travelRoll.includes(x) ||
          x.kind === "Pendant" ||
          isDropEarring(x)
      ),
      mainSection: [],
    },
    tree: new LeafStorage(
      (x) =>
        x.kind === "Necklace" || (x.kind === "Earring" && x.type === "Hoop")
    ),
    travelRoll,
    safe: new LeafStorage((x) => x.stone === "Diamond"),
    dresserTop: [],
    push(item: Jewellery) {
      if (item.kind === "Necklace" && item.type === "Pendant") {
        this.box.topShelf.push(item.pendant);
        this.tree.push(item.chain);
        return true;
      }
      return (
        this.safe.push(item) ||
        this.box.topShelf.push(item) ||
        this.tree.push(item)
      );
    },
  };
};

class LeafStorage {
  public _items: Array<Jewellery>;
  constructor(private accepts: (item: Jewellery) => boolean) {
    this._items = [];
  }

  push(item: Jewellery) {
    if (this.accepts(item)) {
      this._items.push(item);
      return true;
    }
    return false;
  }

  includes(item: Jewellery) {
    return this._items.includes(item);
  }
}

export interface Storage {
  push: (item: Jewellery) => boolean;
  includes: (item: Jewellery) => boolean;
  _items: Array<Jewellery>;
}
