var charToEntityRegex,
    entityToCharRegex,
    charToEntity,
    entityToChar;

function resetCharacterEntities() {
    charToEntity = {};
    entityToChar = {};

    // add the default set
    addCharacterEntities({
        '&amp;': '&',
        '&gt;': '>',
        '&lt;': '<',
        '.&quot;': '"',
        '&#39;': "'",
        '&#039;t': "'",
        "&ecirc;": "ê",
        "&eacute;": "é",
        "&ntilde;": "Ñ",
        "&ldquo;": "«",
        "&rdquo;": "»",
    });
}

function addCharacterEntities(newEntities) {
    var charKeys = [],
        entityKeys = [],
        key, echar;
    for (key in newEntities) {
        echar = newEntities[key];
        entityToChar[key] = echar;
        charToEntity[echar] = key;
        charKeys.push(echar);
        entityKeys.push(key);
    }
    const add1 = entityKeys.join('|');
    const add2 = charKeys.join('|');
    const add3 = '|&#[0-9]{1,5};';
    charToEntityRegex = new RegExp('(' + add2 + ')', 'g');
    entityToCharRegex = new RegExp('(' + add1 + add3 + ')', 'g');
}
function htmlEncode(value) {
    var htmlEncodeReplaceFn = function (match, capture) {
        return charToEntity[capture];
    };

    return (!value) ? value : String(value).replace(charToEntityRegex, htmlEncodeReplaceFn);
}

function htmlDecode(value) {
    var htmlDecodeReplaceFn = function (match, capture) {
        return (capture in entityToChar) ? entityToChar[capture] : String.fromCharCode(parseInt(capture.substr(2), 10));
    };

    return (!value) ? value : String(value).replace(entityToCharRegex, htmlDecodeReplaceFn);
}

resetCharacterEntities();

export {
    htmlEncode as default,
    htmlDecode,
};