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
	let tokenButton = sceneControlButtons.find(b => b.name === "token");
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

	game.settings.register("ThandulsTogglableEffects", "togglesPerRow", {
		name: "Number of effect toggles per row",
		hint: "Number of effect toggles thatg will be displayed in one row of the panel.",
		scope: "world",
		config: true,
		default: 4,
		type: String
	});

	game.settings.register("ThandulsTogglableEffects", "sortToggles", {
		name: "Sort effect toggles by name",
		hint: "Effect toggles can be sroted on the panel alphabetically by name",
		scope: "world",
		config: true,
		default: true,
		type: Boolean
	});

	game.settings.register("ThandulsTogglableEffects", "enableAutomation", {
		name: "Enable effect automation",
		hint: "Some effects like Barkskin, Rage, Mage Armor and Shield can be automatically applied to Actor that used appropiate skill.",
		scope: "world",
		config: true,
		default: true,
		type: Boolean
	});

	// Enabling effects for client.
	ThandulBuffsAndEffects.effects.forEach(effect => game.settings.register("ThandulsTogglableEffects", "enabledEffects." + effect.settingsKey, {
			name: effect.name,
			hint: "Enables " + effect.name +  " toggle.",
			scope: "client",
			config: true,
			default: true,
			type: Boolean
		})
	);
});