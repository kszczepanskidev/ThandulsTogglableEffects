function initialize(sceneControlHTML) {
    let sceneControlButton = 
    $(`<li class="scene-control thandul-togglables-scene-control" data-control="thandul-togglables" title="Thanduls Togglable Buffs and Effects">
        <img src="modules/ThandulsTogglableBuffsAndEffects/media/logo.png" />
        <ol class="control-tools">
            <div id="TTpopup" class="thandul-togglables-popup" style="display: none;">
            </div>
        </ol>
    </li>`);
    sceneControlButton[0].addEventListener('click', event => togglePopup(event, sceneControlHTML));
    createTogglablesTable(sceneControlButton);
    sceneControlHTML.append(sceneControlButton);
}

function createTogglablesTable(sceneControlHTML) {
    let tableHTML = arrayChunk(ThandulBuffsAndEffects.getEnabledEffects(), 4).map(effects => createEffectsRowHTML(effects)).join('');
    sceneControlHTML.find('.thandul-togglables-popup ul').remove();
    sceneControlHTML.find('.thandul-togglables-popup').append(tableHTML);
    sceneControlHTML.find('.thandul-togglables-popup li').click(ThandulBuffsAndEffects.handleEffectToggleEvent);
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

function togglePopup(event, sceneControlHTML) {
    let sceneControlButton = sceneControlHTML.find('.thandul-togglables-scene-control');
    if (sceneControlButton.hasClass('active')) {
        sceneControlHTML.find('#TTpopup').hide();
        sceneControlHTML.find('.scene-control').first().addClass('active');
        sceneControlButton.removeClass('active');

    } else {
        this.createTogglablesTable(sceneControlHTML);
        sceneControlHTML.find('.scene-control').removeClass('active');
        sceneControlHTML.find('#TTpopup').show();
        sceneControlButton.addClass('active');
    }
    if (event) { event.stopPropagation(); }
}