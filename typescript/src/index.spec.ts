import { makeStorage, pack, packNecklace } from ".";
import {
  Jewellery,
  makeEarring,
  makeNecklace,
  makePendant,
  makePendantNecklace,
  makeRing,
} from "./jewellery";

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
  return `${item.stone} ${item._kind}`;
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

const packItemCases: Array<Jewellery> = [
  makeEarring("Amber", "Stud"),
  makeEarring("Diamond", "Stud"),
  makeEarring("Plain", "Hoop"),
  makeEarring("Plain", "Drop"),
  makeNecklace("Amber", "Beads"),
  makeNecklace("Plain", "Chain"),
  makeNecklace("Amber", "Chain"),
  makeNecklace("Diamond", "Chain"),
  makeNecklace("Pearl", "Beads"),
  makePendantNecklace("Pearl", "Beads"),
  makePendantNecklace("Amber", "LongChain"),
  makeRing("Amber"),
  makeRing("Diamond"),
  makePendant("Plain"),
];

const travelRollCases: Array<Jewellery> = [
  makeEarring("Amber", "Stud"),
  makeEarring("Diamond", "Stud"),
  makeEarring("Plain", "Hoop"),
  makeEarring("Plain", "Drop"),
  makeEarring("Pearl", "Drop"),
  makeNecklace("Amber", "Beads"),
  makeNecklace("Plain", "Chain"),
  makeNecklace("Amber", "Chain"),
  makeNecklace("Diamond", "Chain"),
  makeNecklace("Pearl", "Beads"),
  makePendantNecklace("Pearl", "Beads"),
  makePendantNecklace("Amber", "LongChain"),
  makeRing("Amber"),
  makeRing("Diamond"),
];

for (const item of packItemCases) {
  test(`Pack item: ${nameOf(item)}`, () => {
    const storage = makeStorage();
    pack(item, storage);
    expect(storage).toMatchSnapshot(nameOf(item));
  });
}

for (const item of packNecklaceCases) {
  test(`Pack necklace: ${nameOf(item)}`, () => {
    const storage = makeStorage();
    packNecklace(item, storage);
    expect(storage).toMatchSnapshot(nameOf(item));
  });
}

for (const item of travelRollCases) {
  test(`From travellroll: ${nameOf(item)}`, () => {
    const storage = makeStorage();
    pack(item, storage);
    expect(storage).toMatchSnapshot(nameOf(item));
  });
}

/*
test.each`
  item
`("Pack item from travel roll", ({ item }) => {
  const storage = makeStorage();
  storage.travelRoll.push(item);
  pack(item, storage),
    approvals.verifyAsJSON(
      approvalDir,
      `From travel roll: ${printItem(item)}`,
      unwrap(storage),
      {
        forceApproveAll: process.env["APPROVE"] === "1",
      }
    );
});
*/
