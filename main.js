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
  }

  /**
   * Event handler fyrir nýtt svar. Bætir nýrri færslu við DOM útfrá e.target
   * Setur nafn í alla aðra input reiti
   *
   * @param {object} e Event frá formi
   */
  function newReplyHandler(e) {
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
  }

  /**
   * Býr til DOM tré fyrir reply form. Nýtir createFormGroup fall til að búa til
   * input, bætir við takka með icon.
   * Hint: Til að laga spacing mál er nóg að bæta við ' ' á eftir form-group
   *
   * @return {node} DOM node fyrir reply form
   */
  function createReplyForm() {
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
