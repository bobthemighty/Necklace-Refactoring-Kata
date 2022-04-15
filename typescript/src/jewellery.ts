import { JewelleryBox } from "./JewelleryBox";

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
