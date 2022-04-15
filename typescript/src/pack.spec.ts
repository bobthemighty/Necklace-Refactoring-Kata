import * as approvals from "approvals";

const approvalDir = `${__dirname}/../approvals`;

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
import { pack, packNecklace } from "./pack";

const printItem = (item: Jewellery): string => {
  if (item.kind === "Necklace" && item.type === "Pendant")
    return `Pendant Necklace (chain: ${printItem(
      item.chain
    )}, pendant: ${printItem(item.pendant)})`;

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

test.each`
  item
  ${makeNecklace("Diamond", "Chain")}
  ${makeNecklace("Plain", "LongChain")}
  ${makeNecklace("Amber", "Chain")}
  ${makeNecklace("Pearl", "Beads")}
  ${makePendantNecklace("Pearl", "Beads")}
  ${makePendantNecklace("Diamond", "Chain")}
  ${makePendantNecklace("Diamond", "LongChain")}
`("Pack Necklace", ({ item }) => {
  const storage = makeStorage();
  packNecklace(item, storage);
  approvals.verifyAsJSON(
    approvalDir,
    `Pack necklace ${printItem(item)}`,
    storage,
    {
      forceApproveAll: process.env["APPROVE"] === "1",
    }
  );
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
  ${makePendant("Plain")}
`("Pack item", ({ item }) => {
  const storage = makeStorage();
  pack(item, storage);
  approvals.verifyAsJSON(approvalDir, `Pack ${printItem(item)}`, storage, {
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
`("Pack item from travel roll", ({ item }) => {
  const storage = makeStorage();
  storage.travelRoll.push(item);
  pack(item, storage),
    approvals.verifyAsJSON(
      approvalDir,
      `From travel roll: ${printItem(item)}`,
      storage,
      {
        forceApproveAll: process.env["APPROVE"] === "1",
      }
    );
});
