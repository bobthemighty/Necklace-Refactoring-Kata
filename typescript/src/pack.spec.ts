import * as approvals from "approvals";

import {
  Jewellery,
  JewelleryStorage,
  makeEarring,
  makeNecklace,
  makePendant,
  makePendantNecklace,
  makeRing,
  makeStorage,
} from "./jewellery";
import { pack } from "./pack";

const printItem = (item: Jewellery): string => {
  if (item.kind === "Necklace" && item.type === "Pendant")
    return `Pendant Necklace (chain: ${printItem(item.chain)}, pendant: ${
      item.pendant
    })`;

  if (item.kind === "Necklace" || item.kind === "Earring")
    return `${item.type} ${item.kind} (${item.stone})`;

  return `${item.kind} (${item.stone})`;
};

const printStore = (items: Array<Jewellery>) =>
  `[${items.map(printItem).join("\n")}]`;

const printStorage = (storage: JewelleryStorage) =>
  `Box:
  Rings:      ${printStore(storage.box.ringCompartment)}
  Top:        ${printStore(storage.box.topShelf)}
  Main:       ${printStore(storage.box.mainSection)}
Tree:         ${printStore(storage.tree)}
Travel Roll:  ${printStore(storage.travelRoll)}
Safe:         ${printStore(storage.safe)}
Dresser Top:  ${printStore(storage.dresserTop)}
`;

const packItem = (item: Jewellery, storage: JewelleryStorage) => {
  let log = `Packing item ${printItem(item)}`;
  if (storage.travelRoll.includes(item)) log += " (is in travel roll)";
  pack(item, storage);
  log += "\n";
  log += printStorage(storage);
  return log;
};

test.each`
  item
  ${makeEarring("Amber", "Stud")}
  ${makeEarring("Diamond", "Stud")}
  ${makeEarring("Plain", "Hoop")}
  ${makeEarring("Plain", "Drop")}
  ${makeEarring("Pearl", "Drop")}
  ${makeNecklace("Amber", "Beads")}
  ${makeNecklace("Plain", "Chain")}
  ${makeNecklace("Amber", "Chain")}
  ${makeNecklace("Diamond", "Chain")}
  ${makeNecklace("Pearl", "Beads")}
  ${makePendantNecklace("Pearl", "Beads")}
  ${makePendantNecklace("Amber", "LongChain")}
  ${makeRing("Amber")}
  ${makeRing("Diamond")}
  ${makePendant("Plain")}
`("Print item", ({ item }) => {
  approvals.verify(__dirname, printItem(item), packItem(item, makeStorage()), {
    forceApproveAll: process.env["APPROVE"] === "1",
  });
});

test.each`
  item
  ${makeEarring("Amber", "Stud")}
  ${makeEarring("Diamond", "Stud")}
  ${makeEarring("Plain", "Hoop")}
  ${makeEarring("Plain", "Drop")}
  ${makeEarring("Pearl", "Drop")}
  ${makeNecklace("Amber", "Beads")}
  ${makeNecklace("Plain", "Chain")}
  ${makeNecklace("Amber", "Chain")}
  ${makeNecklace("Diamond", "Chain")}
  ${makeNecklace("Pearl", "Beads")}
  ${makePendantNecklace("Pearl", "Beads")}
  ${makePendantNecklace("Amber", "LongChain")}
  ${makeRing("Amber")}
  ${makeRing("Diamond")}
`("Print item", ({ item }) => {
  const storage = makeStorage();
  storage.travelRoll.push(item);
  approvals.verify(
    __dirname,
    `From travel roll: ${printItem(item)}`,
    packItem(item, storage),
    {
      forceApproveAll: process.env["APPROVE"] === "1",
    }
  );
});
