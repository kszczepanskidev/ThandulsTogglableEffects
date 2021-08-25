Hooks.once("ready", async () => {
	if (game.user.role < 3) { return; }
	const template = await renderTemplate('modules/ThandulsTogglableEffects/obsolete-dialog.html');
	const dialog = await Dialog.prompt(
		{
			title: "Warning: Thandul's Togglable Effects",
			content: template,
			label: "Ok",
			callback: (html) => {},
			rejectClose: false,
		},
		{ width: 300 }
	);
});