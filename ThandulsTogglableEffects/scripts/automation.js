function handleChatMessage(message) {
    if (!game.settings.get("ThandulsTogglableEffects", "enableAutomation")) { return; }
    const itemIdRegex = /data-item-id="(.*?)"/gm;

    const messageData = message.data;
    const matchResults = itemIdRegex.exec(messageData.content);
    console.warn("matchResults:" + matchResults);
    if(!matchResults) { return; }

    const itemId = matchResults.length > 1 ? matchResults[1] : null;
    console.warn("itemId:" + itemId);
    if (!itemId) { return; }

	const actorId = messageData.speaker.actor || null;
    console.warn("actorId:" + actorId);
    if (!actorId) { return; }
    
    const actor = game.actors.get(actorId);
    console.warn("actor:" + actor);
    if (!actor || actor.permission < 3) { return; }

    const item = actor.getOwnedItem(itemId);
    console.warn("item:" + item);
    if (!item) { return; }

    let togglableEffect = ThandulBuffsAndEffects.effects.find(effect => effect.name == item.name);
    console.warn("togglableEffect:" + togglableEffect);
    if (!togglableEffect) { return; }
    let effect;
    let customEffectValue;
    switch (togglableEffect.name) {
        case "Rage": effect = ThandulBuffsAndEffects.rage(actor); break;
        case "Shield": effect = ThandulBuffsAndEffects.shield(actor); break;
        case "Mage Armor": 
            customEffectValue = isDAEEnabled() ? '13 + @data.abilities.dex.mod' : (13 + actor.data.data.abilities.dex.mod).toString();
            effect = togglableEffect.effectDict(customEffectValue); 
            break;
        case "Sharpshooter", "Great Weapon Master":
            effect = togglableEffect;
        default: return;
    }
    effect.origin = "Actor." + actor.id;

    let effectToRemove = actor.data.effects.find(e => e.label == effect.label);
    if (effectToRemove) { actor.deleteEmbeddedEntity("ActiveEffect", effectToRemove._id); }
    actor.createEmbeddedEntity("ActiveEffect", effect);
}