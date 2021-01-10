function createTogglablesTable() {

    // Create array of HTML elements for effects enabled in settings.
    let togglablesHTML = arrayChunk(ThandulBuffsAndEffects.getEnabledEffects(), 4).map(effects => createEffectsRowHTML(effects)).join('');
    togglablesHTML = "<div class=\"thandulTogglables\">" + togglablesHTML + "</div>";
    
    // Extract token controls button for this module.
    let thandulControl = document.querySelector('li[data-tool="thandulTogglables"]');
    if(!thandulControl) { return; }

    // Try extracting existing div element with effect togglables and remove it.
    let togglablesDiv = thandulControl.getElementsByClassName('thandulTogglables')[0];
    if (togglablesDiv) { thandulControl.removeChild(togglablesDiv); }

    // Insert new HTML for togglables div.
    thandulControl.insertAdjacentHTML('beforeend', togglablesHTML);
    thandulControl.querySelectorAll('div.thandulTogglables li').forEach(element => {
        element.addEventListener("click", ThandulBuffsAndEffects.handleEffectToggleEvent);
    });

    // Adjust `togglablesDiv` position based on number of buttons in Token Control category.
    let currentTokenControls = document.querySelectorAll('li.scene-control[data-control="token"] > ol > li');
    let index;
    for (i = 0; i < currentTokenControls.length; i++) { if (currentTokenControls[i].dataset.tool === 'thandulTogglables') { index = i + 1; } }
    let divElement = document.querySelector('div.thandulTogglables');
    divElement.style.top = (index * -46) + 'px';
}

function createEffectsRowHTML(effects) {
    return `<ul>` + effects.map(effect => `
        <li data-effect-name="` + effect.name + `">
            <div data-effect-name="` + effect.name + `">
                <img src="` + effect.icon + `" data-effect-name="` + effect.name + `"/>
                <p data-effect-name="` + effect.name + `">` + effect.name + `</p>
            </div>
        </li>`
    ) + `</ul>`;
}
