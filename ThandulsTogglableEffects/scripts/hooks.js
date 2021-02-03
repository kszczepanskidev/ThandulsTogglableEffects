Hooks.on('renderSceneControls', () => {
	if (!game.settings.get("ThandulsTogglableEffects", "showForPlayers") && game.user.role < 3) { return; }
	createTogglablesTable();
});

Hooks.on("createChatMessage", (message, params, actorId) => {
	if (game.user.role < 4) { return; }
	handleChatMessage(message);
});

Hooks.on("getSceneControlButtons", (sceneControlButtons) => {
	if (!game.settings.get("ThandulsTogglableEffects", "showForPlayers") && game.user.role < 3) { return; }
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
	game.settings.register("ThandulsTogglableEffects", "showForPlayers", {
		name: "Show for players",
		hint: "Enables panel with effect toggles for non-gm players.",
		scope: "world",
		config: true,
		default: true,
		type: Boolean,
        onChange: _ => window.location.reload()
	});

	// Enabling effects for client.
	game.settings.register("ThandulsTogglableEffects", "enabledEffects.Bane", {
		name: "Bane",
		hint: "Enables Bane toggle.",
		scope: "client",
		config: true,
		default: true,
		type: Boolean
	});
	game.settings.register("ThandulsTogglableEffects", "enabledEffects.Barkskin", {
		name: "Barkskin",
		hint: "Enables Barkskin toggle.",
		scope: "client",
		config: true,
		default: true,
		type: Boolean
	});
	game.settings.register("ThandulsTogglableEffects", "enabledEffects.Bless", {
		name: "Bless",
		hint: "Enables Bless toggle.",
		scope: "client",
		config: true,
		default: true,
		type: Boolean
	});
	game.settings.register("ThandulsTogglableEffects", "enabledEffects.Enlarge", {
		name: "Enlarge",
		hint: "Enables Enlarge toggle.",
		scope: "client",
		config: true,
		default: true,
		type: Boolean
	});
	game.settings.register("ThandulsTogglableEffects", "enabledEffects.FavouredEnemy", {
		name: "Favoured Enemy",
		hint: "Enables Favoured Enemy toggle.",
		scope: "client",
		config: true,
		default: true,
		type: Boolean
	});
	game.settings.register("ThandulsTogglableEffects", "enabledEffects.GreaterFavouredEnemy", {
		name: "Greater Favoured Enemy",
		hint: "Enables Greater Favoured Enemy toggle.",
		scope: "client",
		config: true,
		default: true,
		type: Boolean
	});
	game.settings.register("ThandulsTogglableEffects", "enabledEffects.Fly", {
		name: "Fly",
		hint: "Enables Fly toggle.",
		scope: "client",
		config: true,
		default: true,
		type: Boolean
	});
	game.settings.register("ThandulsTogglableEffects", "enabledEffects.FortunesFavor", {
		name: "Fortune's Favor",
		hint: "Enables Fortune's Favor toggle.",
		scope: "client",
		config: true,
		default: true,
		type: Boolean
	});
	game.settings.register("ThandulsTogglableEffects", "enabledEffects.GiftOfAlacrity", {
		name: "Gift of Alacrity",
		hint: "Enables Gift of Alacrity toggle.",
		scope: "client",
		config: true,
		default: true,
		type: Boolean
	});
	game.settings.register("ThandulsTogglableEffects", "enabledEffects.Guidance", {
		name: "Guidance",
		hint: "Enables Guidance toggle.",
		scope: "client",
		config: true,
		default: true,
		type: Boolean
	});
	game.settings.register("ThandulsTogglableEffects", "enabledEffects.Haste", {
		name: "Haste",
		hint: "Enables Haste toggle.",
		scope: "client",
		config: true,
		default: true,
		type: Boolean
	});
	game.settings.register("ThandulsTogglableEffects", "enabledEffects.HuntersMark1h", {
		name: "Hunter's Mark 1h",
		hint: "Enables Hunter's Mark (1h concentration) toggle.",
		scope: "client",
		config: true,
		default: true,
		type: Boolean
	});
	game.settings.register("ThandulsTogglableEffects", "enabledEffects.HuntersMark8h", {
		name: "Hunter's Mark 8h",
		hint: "Enables Hunter's Mark (8h concentration) toggle.",
		scope: "client",
		config: true,
		default: true,
		type: Boolean
	});
	game.settings.register("ThandulsTogglableEffects", "enabledEffects.HuntersMark24h", {
		name: "Hunter's Mark 24h",
		hint: "Enables Hunter's Mark (24h concentration) toggle.",
		scope: "client",
		config: true,
		default: true,
		type: Boolean
	});
	game.settings.register("ThandulsTogglableEffects", "enabledEffects.Longstrider", {
		name: "Longstrider",
		hint: "Enables Longstrider toggle.",
		scope: "client",
		config: true,
		default: true,
		type: Boolean
	});
	game.settings.register("ThandulsTogglableEffects", "enabledEffects.MageArmor", {
		name: "Mage Armor",
		hint: "Enables Mage Armor toggle.",
		scope: "client",
		config: true,
		default: true,
		type: Boolean
	});
	game.settings.register("ThandulsTogglableEffects", "enabledEffects.PassWithoutTrace", {
		name: "Pass without Trace",
		hint: "Enables Pass without Trace toggle.",
		scope: "client",
		config: true,
		default: true,
		type: Boolean
	});
	game.settings.register("ThandulsTogglableEffects", "enabledEffects.Rage", {
		name: "Rage",
		hint: "Enables Rage toggle.",
		scope: "client",
		config: true,
		default: true,
		type: Boolean
	});
	game.settings.register("ThandulsTogglableEffects", "enabledEffects.Reduce", {
		name: "Reduce",
		hint: "Enables Reduce toggle.",
		scope: "client",
		config: true,
		default: true,
		type: Boolean
	});
	game.settings.register("ThandulsTogglableEffects", "enabledEffects.Shield", {
		name: "Shield",
		hint: "Enables Shield toggle.",
		scope: "client",
		config: true,
		default: true,
		type: Boolean
	});
	game.settings.register("ThandulsTogglableEffects", "enabledEffects.ShieldOfFaith", {
		name: "Shield of Faith",
		hint: "Enables Shield of Faith toggle.",
		scope: "client",
		config: true,
		default: true,
		type: Boolean
	});
	game.settings.register("ThandulsTogglableEffects", "enabledEffects.Slow", {
		name: "Slow",
		hint: "Enables Slow toggle.",
		scope: "client",
		config: true,
		default: true,
		type: Boolean
	});
});