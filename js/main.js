var battle = new RPG.Battle();
var actionForm, spellForm, targetForm;
var infoPanel;

function prettifyEffect(obj) {
    return Object.keys(obj).map(function (key) {
        var sign = obj[key] > 0 ? '+' : ''; // show + sign for positive effects
        return `${sign}${obj[key]} ${key}`;
    }).join(', ');
}


battle.setup({
    heroes: {
        members: [
            RPG.entities.characters.heroTank,
            RPG.entities.characters.heroWizard
        ],
        grimoire: [
            RPG.entities.scrolls.health,
            RPG.entities.scrolls.fireball
        ]
    },
    monsters: {
        members: [
            RPG.entities.characters.monsterSlime,
            RPG.entities.characters.monsterBat,
            RPG.entities.characters.monsterSkeleton,
            RPG.entities.characters.monsterBat
        ]
    }
});

battle.on('start', function (data) {
    console.log('START', data);
});

battle.on('turn', function (data) {
    console.log('TURN', data);

    // TODO: render the characters
    var list = Object.keys(this._charactersById);
    var listChara = document.querySelectorAll('.character-list');
    var heroesList = listChara[0];
    var monstersList = listChara [1];
    var aux;
    for (var i in list){
        aux = this._charactersById[list[i]];
         var li = document.createElement('li');
         li.innerHTML = aux.name+'(HP: <strong>'+aux.hp+'</strong>/'+aux.maxHp+', MP: <strong>'+aux.mp+'</strong>/'+aux.maxMp+')';
         li.dataset.charaid = list[i];
       if (aux.party === 'heroes'){
         heroesList.appendChild(li);
       }
       else {
        monstersList.appendChild(li);
       }
}
    // TODO: highlight current character
    var active = document.querySelector('[data-charaid="'+data.activeCharacterId+'"]');
    active.classList.add("active");
    
    // TODO: show battle actions form
    actionForm.style.display = 'inline';
    var actions = actionForm.querySelector('.choices');
    var options = this.options.current._group;
    for(var i in options){
        var li = document.createElement('li');
        li.innerHTML = '<label><input type="radio" name="option" value="'+i+'" required> '+i+'</label>';
        actions.appendChild(li);
       
    }
    targetForm.style.display = 'none';
    var char = this._charactersById; //el orden importa?? hay que poner esto aquí??
    var targets = targetForm.querySelector('.choices');
    for(var i in char){
        var li = document.createElement('li');
         li.innerHTML = '<label><input type="radio" name="target" value="'+i+'" required> '+i+'</label>';
         targets.appendChild(li);
    }
    
});

battle.on('info', function (data) {
    console.log('INFO', data);
    console.log(actionForm);
    // TODO: display turn info in the #battle-info panel
});

battle.on('end', function (data) {
    console.log('END', data);
    
    // TODO: re-render the parties so the death of the last character gets reflected
    // TODO: display 'end of battle' message, showing who won
});

window.onload = function () {
    actionForm = document.querySelector('form[name=select-action]');
    targetForm = document.querySelector('form[name=select-target]');
    spellForm = document.querySelector('form[name=select-spell]');
    infoPanel = document.querySelector('#battle-info');

    actionForm.addEventListener('submit', function (evt) {
        evt.preventDefault();

        // TODO: select the action chosen by the player
        var action = actionForm.elements['option'].value;
        battle.options.select(action);
        
       // console.log(action);

        // TODO: hide this menu
        actionForm.style.display = 'none';
        // TODO: go to either select target menu, or to the select spell menu
         targetForm.style.display = 'block';
    });

    targetForm.addEventListener('submit', function (evt) {
        evt.preventDefault();
        // TODO: select the target chosen by the player
        var target = targetForm.elements['target'].value;
        battle.options.select(target);
        // TODO: hide this menu
          targetForm.style.display = 'none';

    });

    targetForm.querySelector('.cancel')
    .addEventListener('click', function (evt) {
        evt.preventDefault();
        // TODO: cancel current battle options
        battle.options.cancel;
        // TODO: hide this form
        targetForm.style.display = 'none';
        // TODO: go to select action menu
        actionForm.style.display = 'block';
    });

    spellForm.addEventListener('submit', function (evt) {
        evt.preventDefault();
        // TODO: select the spell chosen by the player
        // TODO: hide this menu
        // TODO: go to select target menu
    });

    spellForm.querySelector('.cancel')
    .addEventListener('click', function (evt) {
        evt.preventDefault();
        // TODO: cancel current battle options
        // TODO: hide this form
        // TODO: go to select action menu
    });

    battle.start();
};
 /*var radio = document.createElement('label');
        var input = document.createElement('input');
        input.type = "radio";
        input.name = "option";
        input.value = i;
        input.required = true;
        radio.innerHTML = i;
        actions.appendChild(input);
        actions.appendChild(radio);
        */