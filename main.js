document.addEventListener('DOMContentLoaded',function() {
  Forum.init();
});

/**
 * Virkni fyrir spjallborð. Geymum færslur í fylki þar sem hver færsla er
 * {
 *    name: 'Nafn',
 *    text: 'Texti',
 *    replies: [
 *      {
 *        name: 'Nafn 2',
 *        text: 'Texti 2'
 *      },
 *      ...
 *    ]
 *  }
 */
var Forum = (function() {

  /**
   * Lykill fyrir localstorage, geymum *allar* færslur undir þessum lykli í
   * fylki sem er breytt í JSON streng með JSON.stringify() og til baka í fylki
   * með JSON.parse()
   */
  var LOCALSTORAGE = 'forum';

  /**
   * Inngangur í forrit, viljum:
   *  1. Athuga hvort við eigum vistuð gögn í localStorage, ef svo er,
   *     hlaða þeim inn (yfir allt sem er til staðar nú þegar)
   *  2. Ef engin gögn, finna gögn sem eru nú þegar til staðar og vista þau í
   *     localStorage
   *  3. Binda event handlera við nýja færslu form og nýtt svar form
   *  4. Binda "takmarkara" við alla reiti
   *
   * Þegar ný færsla eða nýtt svar er búið til, er góð leið að finna _allar_
   * færslur og svör úr DOM og vista það, getum þá samnýtt fall úr 1. í það og
   * losnum við tvöfalt bókhald, eitt í DOM og annað í kóða.
   */
  function init() {
    console.log('Halló heimur!');
    var form = document.getElementById('form');
    var button = form.querySelector('button');
    var list = document.querySelector('.list');

    console.log('fann form', form, 'með button', button);

    form.addEventListener('submit', newEntryHandler);

  }

  /**
   * Finnur núverandi færslur á síðu og skilar í gagnastrúktúr
   *
  * @return {array} Fylki af færslum á núverandi síðu í gagnastrúktúr
   */
  function parseEntries() {
  }

  /**
   * Finnur svör við færslum úr DOMi
   *
   * @param {node} element DOM element fyrir færslum
   *
   * @return {array} Fylki af svörum, tómt ef engin svör
   */
  function parseReplies(element) {
  }

  /**
   * Event handler fyrir nýja færslu. Bætir nýrri færslu við DOM.
   * Setur nafn í alla aðra input reiti
   *
   * @param {object} e Event frá formi
   */
  function newEntryHandler(e) {
    console.log('Submit á formi, event er', e);

    e.preventDefault();

    var form = e.target;
    var nameEntry = form.querySelector('input[name=name]');
    var textEntry = form.querySelector('textarea[name=comment]');

    var name = nameEntry ? nameEntry.value : '';
    var text = textEntry ? textEntry.value : '';

    console.log('nafn er', name);
    console.log('texti er', text);

    var node = addEntry(name, text);

    var list = document.querySelector('.list');
    console.log('Bætum', node, 'við', list);

    list.appendChild(node);

    nameEntry.value = '';
    textEntry.value = '';
  }

  /**
   * Event handler fyrir nýtt svar. Bætir nýrri færslu við DOM útfrá e.target
   * Setur nafn í alla aðra input reiti
   *
   * @param {object} e Event frá formi
   */
  function newReplyHandler(e) {
    console.log('Submit á reply formi, event er', e);

    e.preventDefault();

    var form = e.target;
    var nameEntry = form.querySelector('input[name=name]');
    var textEntry = form.querySelector('input[name=comment]');

    var name = nameEntry ? nameEntry.value : '';
    var text = textEntry ? textEntry.value : '';

    console.log('nafn er', name);
    console.log('texti er', text);

    var replysNode = document.createElement('li');
    replysNode.classList.add('item', 'item-new', 'list-group-item');
    addReply(replysNode,name, text);

    var list = document.querySelector('.list');
    console.log('Bætum', replysNode, 'við', list);

    list.appendChild(replysNode);

    nameEntry.value = '';
    textEntry.value = '';
  }

  /**
   * Event handler fyrir skrif í box, leyfir ekki að skrifa ef stafir eru fleiri
   * en maxChars og birtir þá skilaboð um það.
   * Hint: Getum notað constrainText.bind(null, 100) í addEventListener
   *
   * @param {number} maxChars Hámark stafa sem má vera
   * @param {object} e Event frá formi
   */
  function constrainText(maxChars, e) {
  }

  /**
   * Bætir nýju svari við DOM undir repliesNode
   *
   * @param {string} name Nafn fyrir svar
   * @param {string} text Texti á svar
   */
  function addReply(repliesNode, name, text) {
    var replyNode = document.createElement('div');
    replyNode.classList.add('reply', 'well');

    var nameNode = document.createElement('h4');
    nameNode.classList.add('name');
    nameNode.appendChild(document.createTextNode(name));

    var textNode = document.createElement('p');
    textNode.classList.add('text');
    textNode.appendChild(document.createTextNode(text));

    replyNode.appendChild(nameNode);
    replyNode.appendChild(textNode);

    repliesNode.appendChild(replyNode);
  }

  function setName(name) {
    var nameInputs = document.querySelectorAll('[name="name"]');

    for(var i = 0; i<nameInputs.length; i++) {
      nameInputs[i].value = name;
    }
  }

  /**
   * Bætir nýrri færslu við DOM
   *
   * @param {string} name Nafn fyrir færslu
   * @param {string} text Texti á færslu
   */
  function addEntry(name, text) {
      var entry = document.createElement('li');
      entry.classList.add('item', 'item-new', 'list-group-item');
      // entry.dataset.date = date;

      var nameNode = document.createElement('h2');
      nameNode.classList.add('name');
      nameNode.appendChild(document.createTextNode(name));

      var textNode = document.createElement('div');
      textNode.classList.add('text');
      textNode.appendChild(document.createTextNode(text));

      entry.appendChild(nameNode);
      entry.appendChild(textNode);
      entry.appendChild(createReplyForm());


      return entry;
  }

  /**
   * Býr til DOM tré fyrir reply form. Nýtir createFormGroup fall til að búa til
   * input, bætir við takka með icon.
   * Hint: Til að laga spacing mál er nóg að bæta við ' ' á eftir form-group
   *
   * @return {node} DOM node fyrir reply form
   */
  function createReplyForm() { //work in progress
    var entry = document.createElement('form');
    entry.classList.add('item', 'item-new', 'list-group-item', 'jumbotron', '.form-control', '.form-group');

    var nameNode = document.createElement('h2');
    nameNode.classList.add('name');
    nameNode.appendChild(document.createTextNode(''));

    var inputNodeName = document.createElement('input');
    inputNodeName.className = 'name';
    inputNodeName.name = 'name';
    inputNodeName.placeholder = 'Nafn';
    inputNodeName.classList.add('name');
    inputNodeName.appendChild(document.createTextNode(''));

    var inputNodeReply = document.createElement('input');
    inputNodeReply.className = 'comment';
    inputNodeReply.name = 'comment';
    inputNodeReply.placeholder = 'Svar';
    inputNodeReply.classList.add('reply');
    inputNodeReply.appendChild(document.createTextNode(''));

    var buttonNode = document.createElement('button');
    buttonNode.className = 'submitButton';
    buttonNode.type = 'submit';
    buttonNode.name = 'submitButton';
    buttonNode.classList.add('btn', 'btn-primary', 'glyphicon', 'glyphicon-pencil');
    buttonNode.appendChild(document.createTextNode('Svara'));
    console.log('Bjó til', buttonNode, inputNodeReply);
    entry.addEventListener('submit', newReplyHandler);


    entry.appendChild(nameNode);
    entry.appendChild(inputNodeName);
    entry.appendChild(inputNodeReply);
    entry.appendChild(buttonNode);
    // entry.appendChild(replysNode);

    return entry;
    // console.log('create reoky form');
    // var entry = document.createElement('form');
    // entry.classList.add('reply');
    //
    // var nameInputNode = document.createElement('input');
    // nameInputNode.classList.add('name');
    // document.getElementsByName('name').placeholder = 'Nafn';
    //
    // return entry;
  }

  /**
   * Býr til DOM tré fyrir form group.
   *
   * @param {string} label Label á form
   * @param {string} name Nafn á input
   *
   * @return {node} DOM node fyrir form group
   */
  function createFormGroup(label, name) {
  }

  /**
   * Sækir færslur úr localStorage og skilar í fylki
   *
   * @param {string} key Lykill sem við notum í localStorage
   * @param {array} Fylki af færslum til að vista
   */
  function save(key, items) {
  }

  /**
   * Sækir færslur úr localStorage og skilar í fylki
   *
   * @param {string} key Lykill sem við notum í localStorage
   *
   * @return {array} Fylki af færslum í localStorage ef einhverjar
   * @return {null} Ef engin færsla til staðar í localStorage
   */
  function load(key) {
  }

  return {
    init: init
  };
})();
