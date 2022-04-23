import { makeStorage, packNecklace } from ".";
import { Jewellery, makeNecklace, makePendantNecklace } from "./jewellery";

const nameOf = (item: Jewellery) => {
  switch (item._kind) {
    case "Ring":
      return `${item.stone} ring`;
    case "Earring":
      return `${item.stone} ${item.type} earrings`;
    case "Necklace":
      if (item.type === "Pendant") {
        return `${item.chain.type} necklace with ${item.pendant.stone} pendant`;
      }
      return `${item.stone} ${item.type} necklace`;
  }
};

const packNecklaceCases = [
  makeNecklace("Diamond", "Chain"),
  makeNecklace("Plain", "LongChain"),
  makeNecklace("Amber", "Chain"),
  makeNecklace("Pearl", "Beads"),
  makePendantNecklace("Pearl", "Beads"),
  makePendantNecklace("Diamond", "Chain"),
  makePendantNecklace("Diamond", "LongChain"),
];

for (const item of packNecklaceCases) {
  test(`Pack necklace: ${nameOf(item)}`, () => {
    const storage = makeStorage();
    packNecklace(item, storage);
    expect(storage).toMatchSnapshot(nameOf(item));
  });
}
