class ThandulBuffsAndEffects {

    static getEnabledEffects() {
        let enabledEffects = [];
        if (game.settings.get("ThandulsTogglableEffects", "enabledEffects.Bane")) { enabledEffects.push(this.bane()); }
        if (game.settings.get("ThandulsTogglableEffects", "enabledEffects.Barkskin")) { enabledEffects.push(this.barkskin()); }
        if (game.settings.get("ThandulsTogglableEffects", "enabledEffects.Bless")) { enabledEffects.push(this.bless()); }
        if (game.settings.get("ThandulsTogglableEffects", "enabledEffects.Enlarge")) { enabledEffects.push(this.enlarge()); }
        if (game.settings.get("ThandulsTogglableEffects", "enabledEffects.FavouredEnemy")) { enabledEffects.push(this.favouredEnemy()); }
        if (game.settings.get("ThandulsTogglableEffects", "enabledEffects.GreaterFavouredEnemy")) { enabledEffects.push(this.greaterFavouredEnemy()); }
        if (game.settings.get("ThandulsTogglableEffects", "enabledEffects.Fly")) { enabledEffects.push(this.fly()); }
        if (game.settings.get("ThandulsTogglableEffects", "enabledEffects.FortunesFavor")) { enabledEffects.push(this.fortunesFavor()); }
        if (game.settings.get("ThandulsTogglableEffects", "enabledEffects.GiftOfAlacrity")) { enabledEffects.push(this.giftOfAlacrity()); }
        if (game.settings.get("ThandulsTogglableEffects", "enabledEffects.Guidance")) { enabledEffects.push(this.guidance()); }
        if (game.settings.get("ThandulsTogglableEffects", "enabledEffects.Haste")) { enabledEffects.push(this.haste()); }
        if (game.settings.get("ThandulsTogglableEffects", "enabledEffects.HuntersMark1h")) { enabledEffects.push(this.huntersMark(1)); }
        if (game.settings.get("ThandulsTogglableEffects", "enabledEffects.HuntersMark8h")) { enabledEffects.push(this.huntersMark(8)); }
        if (game.settings.get("ThandulsTogglableEffects", "enabledEffects.HuntersMark24h")) { enabledEffects.push(this.huntersMark(24)); }
        if (game.settings.get("ThandulsTogglableEffects", "enabledEffects.Longstrider")) { enabledEffects.push(this.longstrider()); }
        if (game.settings.get("ThandulsTogglableEffects", "enabledEffects.MageArmor")) { enabledEffects.push(this.mageArmor()); }
        if (game.settings.get("ThandulsTogglableEffects", "enabledEffects.PassWithoutTrace") && isDAEEnabled()) { enabledEffects.push(this.passWithoutTrace()); }
        if (game.settings.get("ThandulsTogglableEffects", "enabledEffects.Rage")) { enabledEffects.push(this.rage()); }
        if (game.settings.get("ThandulsTogglableEffects", "enabledEffects.Reduce")) { enabledEffects.push(this.reduce()); }
        if (game.settings.get("ThandulsTogglableEffects", "enabledEffects.Shield")) { enabledEffects.push(this.shield()); }
        if (game.settings.get("ThandulsTogglableEffects", "enabledEffects.ShieldOfFaith")) { enabledEffects.push(this.shieldOfFaith()); }
        if (game.settings.get("ThandulsTogglableEffects", "enabledEffects.Slow")) { enabledEffects.push(this.slow()); }
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
            case "Favoured Enemy": effect = this.favouredEnemy(); break;
            case "Greater Favoured Enemy": effect = this.greaterFavouredEnemy(); break;
            case "Fly": effect = this.fly(); break;
            case "Fortune's Favor": effect = this.fortunesFavor(); break;
            case "Gift of Alacrity": effect = this.giftOfAlacrity(); break;
            case "Guidance": effect = this.guidance(); break;
            case "Haste": effect = this.haste(); break;
            case "Hunter's Mark 1h": effect = this.huntersMark(1); break;
            case "Hunter's Mark 8h": effect = this.huntersMark(8); break;
            case "Hunter's Mark 24h": effect = this.huntersMark(24); break;
            case "Longstrider": effect = this.longstrider(); break;
            case "Mage Armor": effect = this.mageArmor(actor.data.data.abilities.dex.mod); break;
            case "Pass without Trace": effect = this.passWithoutTrace(); break;
            case "Rage": effect = this.rage(actor); break;
            case "Reduce": effect = this.reduce(); break;
            case "Shield": effect = this.shield(actor); break;
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
            icon: "modules/ThandulsTogglableEffects/media/bane.jpg",
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
            icon: "modules/ThandulsTogglableEffects/media/barkskin.jpg",
            duration: getDurationData(60),
            changes: [
                {key: "data.attributes.ac.value", mode: 4, value: 16, priority: 60},
              ],
        };
    }

    static bless() { 
        return {
            name: "Bless",
            label: "Toggled Effect: Bless",
            icon: "modules/ThandulsTogglableEffects/media/bless.jpg",
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
            icon: "modules/ThandulsTogglableEffects/media/enlargereduce.jpg",
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
            icon: "modules/ThandulsTogglableEffects/media/fly.jpg",
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
            icon: "modules/ThandulsTogglableEffects/media/fortunes-favor.jpg",
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
            icon: "modules/ThandulsTogglableEffects/media/gift-of-alacrity.jpg",
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
            icon: "modules/ThandulsTogglableEffects/media/guidance.jpg",
            duration: getDurationData(1),
            flags: {
                dae: {
                    specialDuration: ["isCheck", "isSkill"]
                }
            },
            changes: [
                {key: "data.bonuses.abilities.check", mode: 2, value: "+1d4"},
                {key: "data.attributes.init.value", mode: 2, value: "+1d4"},
              ],
        };
    }

    static haste() { 
        return {
            name: "Haste",
            label: "Toggled Effect: Haste",
            icon: "modules/ThandulsTogglableEffects/media/haste.jpg",
            duration: getDurationData(1),
            changes: [
                {key: "data.attributes.ac.value", mode: 2, value: 2, priority: 80},
                {key: "data.attributes.movement.burrow", mode: 1, value: 2},
                {key: "data.attributes.movement.climb", mode: 1, value: 2},
                {key: "data.attributes.movement.fly", mode: 1, value: 2},
                {key: "data.attributes.movement.swim", mode: 1, value: 2},
                {key: "data.attributes.movement.walk", mode: 1, value: 2},
              ],
        };
    }

    static huntersMark(durationHours) { 
        return {
            name: "Hunter's Mark " + durationHours + "h",
            label: "Toggled Effect: Hunter's Mark",
            icon: "modules/ThandulsTogglableEffects/media/hunters-mark.jpg",
            duration: getDurationData(60 * durationHours),
            changes: [
                {key: "data.bonuses.mwak.damage", mode: 2, value: "1d6"},
                {key: "data.bonuses.rwak.damage", mode: 2, value: "1d6"},
              ],
        };
    }

    static longstrider() { 
        return {
            name: "Longstrider",
            label: "Toggled Effect: Longstrider",
            icon: "modules/ThandulsTogglableEffects/media/longstrider.jpg",
            duration: getDurationData(60),
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
            icon: "modules/ThandulsTogglableEffects/media/mage-armor.jpg",
            duration: getDurationData(480),
            changes: [
                {key: "data.attributes.ac.value", mode: 4, value: isDAEEnabled() ? '13 + @data.abilities.dex.mod' : 13 + dexMod},
              ],
        };
    }

    static passWithoutTrace() { 
        return {
            name: "Pass without Trace",
            label: "Toggled Effect: Pass without Trace",
            icon: "modules/ThandulsTogglableEffects/media/pass-without-trace.jpg",
            duration: getDurationData(60),
            changes: [
                {key: "data.skills.ste.mod", mode: 2, value: "10"},
              ],
        };
    }

    static rage(actor) { 
        let rageData = {
            name: "Rage",
            label: "Toggled Effect: Rage",
            icon: "modules/ThandulsTogglableEffects/media/rage.jpg",
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
        if (!classItem) { ui.notifications.warn("Selected actor is not a Barbarian"); return {} }
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
            icon: "modules/ThandulsTogglableEffects/media/enlargereduce.jpg",
            duration: getDurationData(1),
            changes: [
                {key: "data.bonuses.mwak.damage", mode: 2, value: "-1d4"},
                {key: "data.bonuses.rwak.damage", mode: 2, value: "-1d4"},
              ],
        };
    }

    static shield(actor=undefined) { 
        let currentCombat = game.combats.combats.filter(combat => combat.combatants.map(combatant => combatant.actor.id).includes(actor != undefined ? actor.id : ''))[0]
        let combatantCount = currentCombat != undefined ? currentCombat.combatants.length : 0;
        return {
            name: "Shield",
            label: "Toggled Effect: Shield",
            icon: "modules/ThandulsTogglableEffects/media/shield.jpg",
            duration: getDurationData(0.1, combatantCount + 1),
            flags: {
                dae: {
                    specialDuration: ["turnStart"]
                }
            },
            changes: [
                {key: "data.attributes.ac.value", mode: 2, value: "5"},
              ],
        };
    }

    static shieldOfFaith() { 
        return {
            name: "Shield of Faith",
            label: "Toggled Effect: Shield of Faith",
            icon: "modules/ThandulsTogglableEffects/media/shield-of-faith.jpg",
            duration: getDurationData(10),
            changes: [
                {key: "data.attributes.ac.value", mode: 2, value: "2"},
              ],
        };
    }

    static slow() { 
        return {
            name: "Slow",
            label: "Toggled Effect: Slow",
            icon: "modules/ThandulsTogglableEffects/media/slow.jpg",
            duration: getDurationData(1),
            changes: [
                {key: "data.attributes.ac.value", mode: 2, value: "-2"},
                {key: "data.abilities.dex.save", mode: 2, value: "-2"},
              ],
        };
    }

    static favouredEnemy() { 
        return {
            name: "Favoured Enemy",
            label: "Toggled Effect: Favoured Enemy",
            icon: "modules/ThandulsTogglableEffects/media/favoured-enemy.png",
            duration: getDurationData(100),
            changes: [
                {key: "data.bonuses.mwak.damage", mode: 2, value: "2"},
                {key: "data.bonuses.rwak.damage", mode: 2, value: "2"},
              ],
        };
    }

    static greaterFavouredEnemy() { 
        return {
            name: "Greater Favoured Enemy",
            label: "Toggled Effect: Greater Favoured Enemy",
            icon: "modules/ThandulsTogglableEffects/media/favoured-enemy.png",
            duration: getDurationData(100),
            changes: [
                {key: "data.bonuses.mwak.damage", mode: 2, value: "4"},
                {key: "data.bonuses.rwak.damage", mode: 2, value: "4"},
              ],
        };
    }
}