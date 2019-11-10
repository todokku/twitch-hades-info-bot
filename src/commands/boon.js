const { groupBy } = require("lodash");
const { Command } = require("./command");
const gods = require("../data/gods/all.js");

const abilityMap = gods.map(god => god.other).groupBy(ability => ability.name);
const abilityRegexes = Object.keys(abilityMap).map(abilityName =>
  abilityName.replace(" ", " *")
);

const abilityCommand = RegExp(`^(${abilityRegexes})$`, "i");

const boonCommand = new Command({
  command: abilityCommand,
  name: "Ability",
  test: test,
  example: "tipsy shot",
  handler: ({ bot, channelId, commandMatches, logger }) => {
    logger.debug("Command matches: " + JSON.stringify(commandMatches));
    const abilityName = commandMatches[1];
    logger.debug("Ability to look up " + abilityName);
    const message = abilityMap[abilityName];
    logger.debug("Ability message " + message);
    bot.say(channelId, message);
  }
});

module.exports = { boonCommand };