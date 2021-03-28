function handleChatMessage(message) {
    if (!game.settings.get("ThandulsTogglableEffects", "enableAutomation")) { return; }
    const itemIdRegex = /data-item-id="(.*?)"/gm;

    const messageData = message.data;
    const matchResults = itemIdRegex.exec(messageData.content);
    if(!matchResults) { return; }

    const itemId = matchResults.length > 1 ? matchResults[1] : null;
    if (!itemId) { return; }

	const actorId = messageData.speaker.actor || null;
    if (!actorId) { return; }
    
    const actor = game.actors.get(actorId);
    if (!actor || actor.permission < 3) { return; }

    const item = actor.getOwnedItem(itemId);
    if (!item) { return; }

    let effect;
    switch (item.name) {
        case `Barkskin`: effect = ThandulBuffsAndEffects.barkskin(); break;
        case `Rage`: effect = ThandulBuffsAndEffects.rage(actor); break;
        case `Mage Armor`: effect = ThandulBuffsAndEffects.mageArmor(actor.data.data.abilities.dex.mod); break;
        case `Shield`: effect = ThandulBuffsAndEffects.shield(); break;
        default: return;
    }
    effect.origin = "Actor." + actor.id;

    let effectToRemove = actor.data.effects.find(e => e.label == effect.label);
    if (effectToRemove) { actor.deleteEmbeddedEntity("ActiveEffect", effectToRemove._id); }
    actor.createEmbeddedEntity("ActiveEffect", effect);
}