class ThandulBuffsAndEffects {

    static getEnabledEffects() {
        let enabledEffects = [];
        if (game.settings.get("ThandulsTogglableBuffsAndEffects", "enabledEffects.Bane")) { enabledEffects.push(this.bane()); }
        if (game.settings.get("ThandulsTogglableBuffsAndEffects", "enabledEffects.Barkskin")) { enabledEffects.push(this.barkskin()); }
        if (game.settings.get("ThandulsTogglableBuffsAndEffects", "enabledEffects.Bless")) { enabledEffects.push(this.bless()); }
        if (game.settings.get("ThandulsTogglableBuffsAndEffects", "enabledEffects.Enlarge")) { enabledEffects.push(this.enlarge()); }
        if (game.settings.get("ThandulsTogglableBuffsAndEffects", "enabledEffects.Fly")) { enabledEffects.push(this.fly()); }
        if (game.settings.get("ThandulsTogglableBuffsAndEffects", "enabledEffects.FortunesFavor")) { enabledEffects.push(this.fortunesFavor()); }
        if (game.settings.get("ThandulsTogglableBuffsAndEffects", "enabledEffects.GiftOfAlacrity")) { enabledEffects.push(this.giftOfAlacrity()); }
        if (game.settings.get("ThandulsTogglableBuffsAndEffects", "enabledEffects.Guidance")) { enabledEffects.push(this.guidance()); }
        if (game.settings.get("ThandulsTogglableBuffsAndEffects", "enabledEffects.Haste")) { enabledEffects.push(this.haste()); }
        if (game.settings.get("ThandulsTogglableBuffsAndEffects", "enabledEffects.Longstrider")) { enabledEffects.push(this.longstrider()); }
        if (game.settings.get("ThandulsTogglableBuffsAndEffects", "enabledEffects.MageArmor")) { enabledEffects.push(this.mageArmor()); }
        if (game.settings.get("ThandulsTogglableBuffsAndEffects", "enabledEffects.PassWithoutTrace")) { enabledEffects.push(this.passWithoutTrace()); }
        if (game.settings.get("ThandulsTogglableBuffsAndEffects", "enabledEffects.Rage")) { enabledEffects.push(this.rage()); }
        if (game.settings.get("ThandulsTogglableBuffsAndEffects", "enabledEffects.Reduce")) { enabledEffects.push(this.reduce()); }
        if (game.settings.get("ThandulsTogglableBuffsAndEffects", "enabledEffects.Shield")) { enabledEffects.push(this.shield()); }
        if (game.settings.get("ThandulsTogglableBuffsAndEffects", "enabledEffects.ShieldOfFaith")) { enabledEffects.push(this.shieldOfFaith()); }
        if (game.settings.get("ThandulsTogglableBuffsAndEffects", "enabledEffects.Slow")) { enabledEffects.push(this.slow()); }
        return enabledEffects;
    }

    static handleEffectToggleEvent(toggleEvent) {
        for (const actor of canvas.tokens.controlled.map(token => token.actor)) {
            let toggledEffect = ThandulBuffsAndEffects.getEffectForActor(actor, toggleEvent);
            if (!toggledEffect) { continue; }
            let effectToRemove = actor.data.effects.find(effect => effect.label == toggledEffect.label);
            effectToRemove ? actor.deleteEmbeddedEntity("ActiveEffect", effectToRemove._id) : actor.createEmbeddedEntity("ActiveEffect", toggledEffect);
        }
    }

    static getEffectForActor(actor, toggleEvent) {
        let effect;
        switch(toggleEvent.target.dataset.effectName) {
            case "Bane": effect = this.bane(); break;
            case "Barkskin": effect = this.barkskin(); break;
            case "Bless": effect = this.bless(); break;
            case "Enlarge": effect = this.enlarge(); break;
            case "Fly": effect = this.fly(); break;
            case "Fortune's Favor": effect = this.fortunesFavor(); break;
            case "Gift of Alacrity": effect = this.giftOfAlacrity(); break;
            case "Guidance": effect = this.guidance(); break;
            case "Haste": effect = this.haste(); break;
            case "Longstrider": effect = this.longstrider(); break;
            case "Mage Armor": effect = this.mageArmor(actor.data.data.abilities.dex.mod); break;
            case "Pass without Trace": effect = this.passWithoutTrace(); break;
            case "Rage": effect = this.rage(actor); break;
            case "Reduce": effect = this.reduce(); break;
            case "Shield": effect = this.shield(); break;
            case "Shield of Faith": effect = this.shieldOfFaith(); break;
            case "Slow": effect = this.slow(); break;
            default: return undefined;
        }
        effect.origin = "Actor." + actor.id;
        return effect;
    }

    static bane() { 
        return {
            name: "Bane",
            label: "Toggled Effect: Bane",
            icon: "modules/ThandulsTogglableBuffsAndEffects/media/bane.jpg",
            duration: getDurationData(1),
            changes: [
                {key: "data.bonuses.abilities.save", mode: 2, value: "-1d4"},
                {key: "data.bonuses.msak.attack", mode: 2, value: "-1d4"},
                {key: "data.bonuses.mwak.attack", mode: 2, value: "-1d4"},
                {key: "data.bonuses.rsak.attack", mode: 2, value: "-1d4"},
                {key: "data.bonuses.rwak.attack", mode: 2, value: "-1d4"},
            ],
        };
    }

    static barkskin() { 
        return {
            name: "Barkskin",
            label: "Toggled Effect: Barkskin",
            icon: "modules/ThandulsTogglableBuffsAndEffects/media/barkskin.jpg",
            duration: getDurationData(1),
            changes: [
                {key: "data.attributes.ac.value", mode: 4, value: "16"},
              ],
        };
    }

    static bless() { 
        return {
            name: "Bless",
            label: "Toggled Effect: Bless",
            icon: "modules/ThandulsTogglableBuffsAndEffects/media/bless.jpg",
            duration: getDurationData(1),
            changes: [
                {key: "data.bonuses.abilities.save", mode: 2, value: "1d4"},
                {key: "data.bonuses.msak.attack", mode: 2, value: "1d4"},
                {key: "data.bonuses.mwak.attack", mode: 2, value: "1d4"},
                {key: "data.bonuses.rsak.attack", mode: 2, value: "1d4"},
                {key: "data.bonuses.rwak.attack", mode: 2, value: "1d4"},
              ],
        };
    }

    static enlarge() { 
        return {
            name: "Enlarge",
            label: "Toggled Effect: Enlarge",
            icon: "modules/ThandulsTogglableBuffsAndEffects/media/enlargereduce.jpg",
            duration: getDurationData(1),
            changes: [
                {key: "data.bonuses.mwak.damage", mode: 2, value: "1d4"},
                {key: "data.bonuses.rwak.damage", mode: 2, value: "1d4"},
              ],
        };
    }

    static fly() { 
        return {
            name: "Fly",
            label: "Toggled Effect: Fly",
            icon: "modules/ThandulsTogglableBuffsAndEffects/media/fly.jpg",
            duration: getDurationData(10),
            changes: [
                {key: "data.attributes.movement.fly", mode: 4, value: 60},
              ],
        };
    }

    static fortunesFavor() { 
        return {
            name: "Fortune's Favor",
            label: "Toggled Effect: Fortune's Favor",
            icon: "modules/ThandulsTogglableBuffsAndEffects/media/fortunes-favor.jpg",
            duration: getDurationData(60),
            changes: [
                {key: "data.attributes.inspiration", mode: 4, value: "1"},
              ],
        };
    }

    static giftOfAlacrity() { 
        return {
            name: "Gift of Alacrity",
            label: "Toggled Effect: Gift of Alacrity",
            icon: "modules/ThandulsTogglableBuffsAndEffects/media/gift-of-alacrity.jpg",
            duration: getDurationData(480),
            changes: [
                {key: "data.attributes.init.value", mode: 2, value: "1d8"},
              ],
        };
    }

    static guidance() { 
        return {
            name: "Guidance",
            label: "Toggled Effect: Guidance",
            icon: "modules/ThandulsTogglableBuffsAndEffects/media/guidance.jpg",
            duration: getDurationData(1),
            changes: [
                {key: "data.bonuses.abilities.check", mode: 2, value: "1d4"},
              ],
        };
    }

    static haste() { 
        return {
            name: "Haste",
            label: "Toggled Effect: Haste",
            icon: "modules/ThandulsTogglableBuffsAndEffects/media/haste.jpg",
            duration: getDurationData(1),
            changes: [
                {key: "data.attributes.ac.value", mode: 2, value: "2"},
                {key: "data.attributes.movement.burrow", mode: 1, value: 2},
                {key: "data.attributes.movement.climb", mode: 1, value: 2},
                {key: "data.attributes.movement.fly", mode: 1, value: 2},
                {key: "data.attributes.movement.swim", mode: 1, value: 2},
                {key: "data.attributes.movement.walk", mode: 1, value: 2},
              ],
        };
    }

    static longstrider() { 
        return {
            name: "Longstrider",
            label: "Toggled Effect: Longstrider",
            icon: "modules/ThandulsTogglableBuffsAndEffects/media/longstrider.jpg",
            duration: getDurationData(10),
            changes: [
                {key: "data.attributes.movement.burrow", mode: 2, value: 10},
                {key: "data.attributes.movement.climb", mode: 2, value: 10},
                {key: "data.attributes.movement.fly", mode: 2, value: 10},
                {key: "data.attributes.movement.swim", mode: 2, value: 10},
                {key: "data.attributes.movement.walk", mode: 2, value: 10},
              ],
        };
    }

    static mageArmor(dexMod=0) { 
        return {
            name: "Mage Armor",
            label: "Toggled Effect: Mage Armor",
            icon: "modules/ThandulsTogglableBuffsAndEffects/media/mage-armor.jpg",
            duration: getDurationData(480),
            changes: [
                {key: "data.attributes.ac.value", mode: 4, value: 13 + dexMod},
              ],
        };
    }

    static passWithoutTrace() { 
        return {
            name: "Pass without Trace",
            label: "Toggled Effect: Pass without Trace",
            icon: "modules/ThandulsTogglableBuffsAndEffects/media/pass-without-trace.jpg",
            duration: getDurationData(60),
            changes: [
                {key: "data.skills.ste.value", mode: 2, value: "10"},
              ],
        };
    }

    static rage(actor) { 
        let rageData = {
            name: "Rage",
            label: "Toggled Effect: Rage",
            icon: "modules/ThandulsTogglableBuffsAndEffects/media/rage.jpg",
            duration: getDurationData(1),
            changes: [
                {key: "data.bonuses.mwak.damage", mode: 2, value: "2"},
                {key: "data.traits.dr.value", mode: 2, value: "bludgeoning"},
                {key: "data.traits.dr.value", mode: 2, value: "piercing"},
                {key: "data.traits.dr.value", mode: 2, value: "slashing"},
              ],
        };
        if (!actor) { return rageData; }
        const classItem = actor.data.items.filter(isBarbarianClassItem)[0];
        if(classItem.data.subclass === "Path of the Totem Warrior") {
            rageData.changes.push(
                ...[
                    {key: "data.traits.dr.value", mode: 2, value: "acid"},
                    {key: "data.traits.dr.value", mode: 2, value: "cold"},
                    {key: "data.traits.dr.value", mode: 2, value: "fire"},
                    {key: "data.traits.dr.value", mode: 2, value: "force"},
                    {key: "data.traits.dr.value", mode: 2, value: "lightning"},
                    {key: "data.traits.dr.value", mode: 2, value: "necrotic"},
                    {key: "data.traits.dr.value", mode: 2, value: "poison"},
                    {key: "data.traits.dr.value", mode: 2, value: "physical"},
                    {key: "data.traits.dr.value", mode: 2, value: "radiant"},
                    {key: "data.traits.dr.value", mode: 2, value: "thunder"}
                ]
            );
        }
        return rageData;
    }

    static reduce() { 
        return {
            name: "Reduce",
            label: "Toggled Effect: Reduce",
            icon: "modules/ThandulsTogglableBuffsAndEffects/media/enlargereduce.jpg",
            duration: getDurationData(1),
            changes: [
                {key: "data.bonuses.mwak.damage", mode: 2, value: "-1d4"},
                {key: "data.bonuses.rwak.damage", mode: 2, value: "-1d4"},
              ],
        };
    }

    static shield() { 
        return {
            name: "Shield",
            label: "Toggled Effect: Shield",
            icon: "modules/ThandulsTogglableBuffsAndEffects/media/shield.jpg",
            duration: getDurationData(1),
            changes: [
                {key: "data.attributes.ac.value", mode: 2, value: "5"},
              ],
        };
    }

    static shieldOfFaith() { 
        return {
            name: "Shield of Faith",
            label: "Toggled Effect: Shield of Faith",
            icon: "modules/ThandulsTogglableBuffsAndEffects/media/shield-of-faith.jpg",
            duration: getDurationData(1),
            changes: [
                {key: "data.attributes.ac.value", mode: 2, value: "2"},
              ],
        };
    }

    static slow() { 
        return {
            name: "Slow",
            label: "Toggled Effect: Slow",
            icon: "modules/ThandulsTogglableBuffsAndEffects/media/slow.jpg",
            duration: getDurationData(1),
            changes: [
                {key: "data.attributes.ac.value", mode: 2, value: "-2"},
                {key: "data.abilities.dex.save", mode: 2, value: "-2"},
              ],
        };
    }
}