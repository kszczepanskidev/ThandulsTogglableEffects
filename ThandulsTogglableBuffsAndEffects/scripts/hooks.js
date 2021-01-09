Hooks.on('renderSceneControls', () => {
	createTogglablesTable();
});

Hooks.on("createChatMessage", (message, params, actorId) => {
	handleChatMessage(message);
});

Hooks.on("getSceneControlButtons", (sceneControlButtons) => {
	let tokenButton = sceneControlButtons.filter(b => b.name === "token")[0];
	if (!tokenButton) { return; }
	tokenButton.tools.push(
        {
          name: "thandulTogglables",
          title: "Thandul Togglables",
          icon: "fas fa-thandul"
		}
	);
});

Hooks.once("init", () => {
	game.settings.register("ThandulsTogglableBuffsAndEffects", "enabledEffects.Bane", {
		name: "Bane",
		hint: "Enables Bane toggle.",
		scope: "client",
		config: true,
		default: true,
		type: Boolean
	});
	game.settings.register("ThandulsTogglableBuffsAndEffects", "enabledEffects.Barkskin", {
		name: "Barkskin",
		hint: "Enables Barkskin toggle.",
		scope: "client",
		config: true,
		default: true,
		type: Boolean
	});
	game.settings.register("ThandulsTogglableBuffsAndEffects", "enabledEffects.Bless", {
		name: "Bless",
		hint: "Enables Bless toggle.",
		scope: "client",
		config: true,
		default: true,
		type: Boolean
	});
	game.settings.register("ThandulsTogglableBuffsAndEffects", "enabledEffects.Enlarge", {
		name: "Enlarge",
		hint: "Enables Enlarge toggle.",
		scope: "client",
		config: true,
		default: true,
		type: Boolean
	});
	game.settings.register("ThandulsTogglableBuffsAndEffects", "enabledEffects.Fly", {
		name: "Fly",
		hint: "Enables Fly toggle.",
		scope: "client",
		config: true,
		default: true,
		type: Boolean
	});
	game.settings.register("ThandulsTogglableBuffsAndEffects", "enabledEffects.FortunesFavor", {
		name: "Fortune's Favor",
		hint: "Enables Fortune's Favor toggle.",
		scope: "client",
		config: true,
		default: true,
		type: Boolean
	});
	game.settings.register("ThandulsTogglableBuffsAndEffects", "enabledEffects.GiftOfAlacrity", {
		name: "Gift of Alacrity",
		hint: "Enables Gift of Alacrity toggle.",
		scope: "client",
		config: true,
		default: true,
		type: Boolean
	});
	game.settings.register("ThandulsTogglableBuffsAndEffects", "enabledEffects.Guidance", {
		name: "Guidance",
		hint: "Enables Guidance toggle.",
		scope: "client",
		config: true,
		default: true,
		type: Boolean
	});
	game.settings.register("ThandulsTogglableBuffsAndEffects", "enabledEffects.Haste", {
		name: "Haste",
		hint: "Enables Haste toggle.",
		scope: "client",
		config: true,
		default: true,
		type: Boolean
	});
	game.settings.register("ThandulsTogglableBuffsAndEffects", "enabledEffects.Longstrider", {
		name: "Longstrider",
		hint: "Enables Longstrider toggle.",
		scope: "client",
		config: true,
		default: true,
		type: Boolean
	});
	game.settings.register("ThandulsTogglableBuffsAndEffects", "enabledEffects.MageArmor", {
		name: "Mage Armor",
		hint: "Enables Mage Armor toggle.",
		scope: "client",
		config: true,
		default: true,
		type: Boolean
	});
	game.settings.register("ThandulsTogglableBuffsAndEffects", "enabledEffects.PassWithoutTrace", {
		name: "Pass without Trace",
		hint: "Enables Pass without Trace toggle.",
		scope: "client",
		config: true,
		default: true,
		type: Boolean
	});
	game.settings.register("ThandulsTogglableBuffsAndEffects", "enabledEffects.Rage", {
		name: "Rage",
		hint: "Enables Rage toggle.",
		scope: "client",
		config: true,
		default: true,
		type: Boolean
	});
	game.settings.register("ThandulsTogglableBuffsAndEffects", "enabledEffects.Reduce", {
		name: "Reduce",
		hint: "Enables Reduce toggle.",
		scope: "client",
		config: true,
		default: true,
		type: Boolean
	});
	game.settings.register("ThandulsTogglableBuffsAndEffects", "enabledEffects.Shield", {
		name: "Shield",
		hint: "Enables Shield toggle.",
		scope: "client",
		config: true,
		default: true,
		type: Boolean
	});
	game.settings.register("ThandulsTogglableBuffsAndEffects", "enabledEffects.ShieldOfFaith", {
		name: "Shield of Faith",
		hint: "Enables Shield of Faith toggle.",
		scope: "client",
		config: true,
		default: true,
		type: Boolean
	});
	game.settings.register("ThandulsTogglableBuffsAndEffects", "enabledEffects.Slow", {
		name: "Slow",
		hint: "Enables Slow toggle.",
		scope: "client",
		config: true,
		default: true,
		type: Boolean
	});
});