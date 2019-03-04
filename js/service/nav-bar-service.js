import utilService from '../service/util-service.js';


export default {
    updateTitle,
    getCurrTitle
}

const NAV_KEY = 'TITLE-LINK';
var currTitle = '';
_getQuery();

function _getQuery() {
    currTitle = utilService.loadFromStorage(NAV_KEY);
    if (!currTitle) {
        currTitle = 'home-title';
        utilService.saveToStorage(NAV_KEY, currTitle);
    }
}

function updateTitle(type) {
    currTitle = type;
    utilService.saveToStorage(NAV_KEY, type);
}

function getCurrTitle() {
    return currTitle;
}