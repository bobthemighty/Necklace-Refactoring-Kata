type Jewel = "Plain" | "Diamond" | "Pearl" | "Amber";
type EarringType = "Stud" | "Hoop" | "Drop";
type NecklaceType = "Beads" | "Chain" | "LongChain";
type JewelleryType = "Ring" | "Earring" | "Necklace" | "Pendant";
type JewllerySize = "Small" | "Large";

interface BaseJewellery<TKind extends JewelleryType> {
  kind: TKind;
  size(): JewllerySize;
  stone: Jewel;
}

export interface Earring extends BaseJewellery<"Earring"> {
  type: EarringType;
}
export type Ring = BaseJewellery<"Ring">;
export type Pendant = BaseJewellery<"Pendant">;
export interface Necklace extends BaseJewellery<"Necklace"> {
  type: NecklaceType;
}

export interface PendantNecklace extends Omit<Necklace, "type"> {
  type: "Pendant";
  chain: Necklace;
  pendant: Pendant;
}

export type Jewellery = Earring | Ring | Pendant | Necklace | PendantNecklace;

export const makeEarring = (stone: Jewel, type: EarringType): Earring => ({
  kind: "Earring",
  size() {
    return this.type === "Stud" ? "Small" : "Large";
  },
  type,
  stone,
});

export const makeNecklace = (stone: Jewel, type: NecklaceType): Necklace => ({
  kind: "Necklace",
  size() {
    return ["Beads", "LongChain"].includes(this.type) ? "Large" : "Small";
  },
  type,
  stone,
});

export const makePendantNecklace = (
  pendant: Jewel,
  type: NecklaceType
): PendantNecklace => ({
  kind: "Necklace",
  type: "Pendant",
  stone: "Plain",
  chain: makeNecklace("Plain", type),
  pendant: makePendant(pendant),
  size() {
    if (this.chain.size() === "Large" || this.pendant.size() == "Large")
      return "Large";
    return "Small";
  },
});

export const makePendant = (stone: Jewel): Pendant => ({
  kind: "Pendant",
  stone,
  size: () => "Small",
});

export const makeRing = (stone: Jewel): Ring => ({
  kind: "Ring",
  size: () => "Small",
  stone,
});

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
      return false;
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
