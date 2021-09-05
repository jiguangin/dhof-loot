// Imports
const fs = require("fs");
const ethers = require("ethers");
const { abi } = require("./abi");

// Setup contract
const lootAddress = "0x52e334e4c4a1E4fE20eD2e3839Cc7201F56192e3";
const rpc = new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/27239c6ef34c4bb981f3fca8d3be86e9");
const loot = new ethers.Contract(lootAddress, abi, rpc);

(async () => {
  // In-mem retrieval
  let retrievedLoot = [];

  // Collect 1...8000 ids
  for (let i = 8001; i <= 1316348; i++) {
    console.log("Collecting: ", i);

    // Collect parts
    const [chest, foot, hand, head, neck, ring, waist, weapon] =
      await Promise.all([
        loot.getChest(i),
        loot.getFoot(i),
        loot.getHand(i),
        loot.getHead(i),
        loot.getNeck(i),
        loot.getRing(i),
        loot.getWaist(i),
        loot.getWeapon(i),
      ]);

    // Push parts to array
    retrievedLoot.push({
      [i]: {
        chest,
        foot,
        hand,
        head,
        neck,
        ring,
        waist,
        weapon,
      },
    });
  }

  // Write output
  fs.writeFileSync("./output/loot.json", JSON.stringify(retrievedLoot));
})();
