function arrayChunk(array, perChunk) {
    return array.reduce((resultArray, item, index) => { 
        const chunkIndex = Math.floor(index / perChunk)
        if(!resultArray[chunkIndex]) { resultArray[chunkIndex] = [] }
        resultArray[chunkIndex].push(item)
        return resultArray
    }, []);
}

function getDurationData(minutes) {
    return game.combat
    ? {
        startRound: game.combat.round,
        rounds: 10 * minutes,
    }
    : {
        startTime: game.time.worldTime,
        seconds: 60 * minutes
    }
}

function injectActivationResetForLayers() {
    canvas.stage.children.forEach(layer => {
        defaultActivate = layer.activate;
        layer.activate = function() {
            this.deactivate();
            return defaultActivate.apply(this, arguments);
        };
    });
}

function isBarbarianClassItem(item, index, array) {
	return (item.type === "class" && item.name === "Barbarian");
}