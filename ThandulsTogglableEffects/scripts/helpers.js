function arrayChunk(array, perChunk) {
    return array.reduce((resultArray, item, index) => { 
        const chunkIndex = Math.floor(index / perChunk)
        if(!resultArray[chunkIndex]) { resultArray[chunkIndex] = [] }
        resultArray[chunkIndex].push(item)
        return resultArray
    }, []);
}

function getDurationData(minutes, turns=0) {
    return game.combat
    ? {
        startRound: game.combat.round,
        rounds: turns > 0 ? 0 : 10 * minutes,
        turns: turns
    }
    : {
        startTime: game.time.worldTime,
        seconds: 60 * minutes
    }
}

function isBarbarianClassItem(item) {
	return (item.type === "class" && item.name === "Barbarian");
}

function isDAEEnabled() {
    return game.modules.get("dae")?.active;
}