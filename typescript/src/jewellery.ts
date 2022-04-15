type Jewel = "Plain" | "Diamond" | "Pearl" | "Amber"
type EarringType = "Stud" | "Hoop" | "Drop"
type NecklaceType = "Beads" | "Chain" | "LongChain"
type JewelleryType = "Ring" | "Earring" | "Necklace" | "Pendant"
type JewllerySize = "Small" | "Large"

interface BaseJewellery<TKind extends JewelleryType> {
    kind: TKind,
    size(): JewllerySize
    stone: Jewel
}

export interface Earring extends BaseJewellery<"Earring"> {
    type: EarringType
}
export interface Ring extends BaseJewellery<"Ring"> { }
export interface Pendant extends BaseJewellery<"Pendant"> { }
export interface Necklace extends BaseJewellery<"Necklace"> {
    type: NecklaceType
}

export interface PendantNecklace extends Omit<Necklace, "type"> {
    type: "Pendant"
    chain: Necklace
    pendant: Pendant
}

export type Jewellery = Earring | Ring | Pendant | Necklace | PendantNecklace

export const makeEarring = (stone: Jewel, type: EarringType): Earring => ({
    kind: "Earring",
    size() { return this.type === "Stud" ? "Small" : "Large" },
    type,
    stone
})

export const makeNecklace = (stone: Jewel, type: NecklaceType): Necklace => ({
    kind: "Necklace",
    size() { return ["Beads", "LongChain"].includes(this.type) ? "Large" : "Small" },
    type,
    stone
})

export const makePendantNecklace = (pendant: Jewel, type: NecklaceType): PendantNecklace => ({
    kind: "Necklace",
    type: "Pendant",
    stone: "Plain",
    chain: makeNecklace("Plain", type),
    pendant: makePendant(pendant),
    size() {
        if (this.chain.size() === "Large" || this.pendant.size() == "Large")
            return "Large"
        return "Small"
    }
})

export const makePendant = (stone: Jewel): Pendant =>
    ({ kind: "Pendant", stone, size: () => "Small" })

export const makeRing = (stone: Jewel): Ring =>
    ({ kind: "Ring", size: () => "Small", stone });

export interface JewelleryBox {
    ringCompartment: Array<Jewellery>,
    topShelf: Storage,
    mainSection: Array<Jewellery>,
}

export interface JewelleryStorage {
    box: JewelleryBox,
    tree: Array<Jewellery>,
    travelRoll: Array<Jewellery>,
    safe: Storage,
    dresserTop: Array<Jewellery>,
}

export const makeStorage = (): JewelleryStorage => {
    const travelRoll : Array<Jewellery> = [];
    return {
    box: {
        ringCompartment: [],
        topShelf: TopShelf(travelRoll),
        mainSection: []
    },
    tree: [],
    travelRoll,
    safe: Safe(),
    dresserTop: []
    }
}

const Safe = (): Storage => ({
    _items: [],
    includes(item: Jewellery) { return this._items.includes(item) },
    push(item: Jewellery) {
        if (item.stone === "Diamond")
            this._items.push(item)
        return this.includes(item)
    }
})

const TopShelf = (travelRoll: Array<Jewellery>): Storage => ({
    _items: [],
    includes(item: Jewellery) { return this._items.includes(item) },
    push(item: Jewellery) {
        if (item.size() === "Small")
            this._items.push(item)
        else if (travelRoll.includes(item))
            this._items.push(item)
        else if(item.kind === "Pendant")
            this._items.push(item)
        else if(item.kind === "Earring" && item.type === "Drop" && item.stone !== "Plain")
            this._items.push(item)
        return this.includes(item)
    }
})

interface Storage {
    push: (item: Jewellery) => boolean;
    includes: (item: Jewellery) => boolean;
    _items: Array<Jewellery>;
}
