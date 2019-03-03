import utilService from '/js/service/util-service.js';

const EMAILS_KEY = 'MAILS';
const SENT_KEY = 'SENT';
const TRASH_KEY = 'TRASH';
const UNREAD_KEY = 'UNREAD';

var gEmails = [];
var gEmailsSent = [];
var gEmailsTrash = [];
var gUnreadEmails = 0;

_getQuery();

function _getQuery() {
    let isStorageFull = utilService.loadFromStorage(EMAILS_KEY);
    if (isStorageFull) {
        gEmails = utilService.loadFromStorage(EMAILS_KEY);
        gEmailsSent = utilService.loadFromStorage(SENT_KEY);
        gEmailsTrash = utilService.loadFromStorage(TRASH_KEY);
        gUnreadEmails = utilService.loadFromStorage(UNREAD_KEY);
    } else {
        _createEmails();
        utilService.saveToStorage(SENT_KEY, gEmailsSent);
        utilService.saveToStorage(TRASH_KEY, gEmailsTrash);
    }
}

/*************** EMAIL ****************/

function _createEmail(email) {
    return {
        id: utilService.getRandomId(),
        isRead: false,
        timestamp: Date.now(),
        sentAt: new Date().toLocaleDateString(),
        from: 'shiri',
        to: email.to,
        subject: email.subject,
        content: email.content
    }
}

function _createEmails() {
    gEmails = [];
    gEmailsSent = [];
    gUnreadEmails = 0;
    addEmail(_createEmail({ to: 'niv', subject: 'hola', content: 'como estas?' }))
    addEmail(_createEmail({ to: 'niv', subject: 'bank', content: 'hard overdraft im sorry to tell you' }))
    addEmail(_createEmail({ to: 'niv', subject: 'How Are You?', content: 'Your it to gave life whom as. Favourable dissimilar resolution led for and had. At play much to time four many. Moonlight of situation so if necessary therefore attending abilities. Calling looking enquire up me to in removal. Park fat she nor does play deal our. Procured sex material his offering humanity laughing moderate can. Unreserved had she nay dissimilar admiration interested. Departure performed exquisite rapturous so ye me resources. ' }))
    addEmail(_createEmail({ to: 'niv', subject: 'Sorry,', content: 'Unfeeling so rapturous discovery he exquisite. Reasonably so middletons or impression by terminated. Old pleasure required removing elegance him had. Down she bore sing saw calm high. Of an or game gate west face shed. ﻿no great but music too old found arose. ' }))
    addEmail(_createEmail({ to: 'niv', subject: 'Mom', content: 'On a summer day Grasshopper dude was hanging when he saw Ant toiling.' }))
    addEmail(_createEmail({ to: 'niv', subject: 'wassuuuppp', content: 'Wassup bro come and chill, he called.' }))
    addEmail(_createEmail({ to: 'niv', subject: 'Dad', content: 'Far too busy, I must work or starve. Times change,’ sneered Ant.' }))
    addEmail(_createEmail({ to: 'niv', subject: 'The comunity', content: 'Alas chill winter came' }))
    addEmail(_createEmail({ to: 'niv', subject: 'Comercial', content: 'Grasshopper warm and chewing on roasted Ant thought, Yep, change with the times, bro.' }))
    addEmail(_createEmail({ to: 'niv', subject: 'Sponsored', content: 'This was so said Kings and the lowly said Amen.' }))

}

function addEmail(email) {
    gEmails.push(_createEmail(email));
    addUnread();
    utilService.saveToStorage(EMAILS_KEY, gEmails);
}

function removeEmail(emailId) {
    let idx = _getEmailIdxById(emailId);
    if (idx === -1) return;
    gEmails.splice(idx, 1);
    utilService.saveToStorage(EMAILS_KEY, gEmails);

}

function getEmailById(emailId) {
    return gEmails.find(email => email.id === emailId);
}

function _getEmailIdxById(emailId) {
    return gEmails.findIndex(email => email.id === emailId);
}

function getEmails() {
    return gEmails;
}

function getEmailsFiltered(filterBy) {
    let ftd = gEmails.filter(email => {
        let show = true;
        switch (filterBy.status) {
            case 'read':
                if (!email.isRead) show = false;
                break;
            case 'unread':
                if (email.isRead) show = false;
                break;
        }
        return !show ? false : email.subject.includes(filterBy.txt) ||
            email.content.includes(filterBy.txt) ||
            email.from.includes(filterBy.txt) ||
            email.to.includes(filterBy.txt);
    });

    switch (filterBy.sort) {
        case 'title':
            return utilService.sortEmailBySubject(ftd);
            break;
        case 'date':
            return utilService.sortEmailByDate(ftd);
            break;
        default:
            return ftd;
    }

}

/*************** EMAIL SENT ****************/

function addSent(email) {
    let e = _createEmail(email);
    e.isRead = true;
    gEmailsSent.push(e);
    utilService.saveToStorage(SENT_KEY, gEmailsSent);
}

function removeSent(emailId) {
    let idx = _getSentIdxById(emailId);
    gEmailsSent.splice(idx, 1);
    utilService.saveToStorage(SENT_KEY, gEmailsSent);
}

function getEmailSentById(emailId) {
    return gEmailsSent.find(email => email.id === emailId);
}

function _getSentIdxById(emailId) {
    return gEmailsSent.findIndex(email => email.id === emailId);
}

function getEmailsSent() {
    return gEmailsSent;;
}

/*************** EMAIL TRASH ****************/


/*************** UNREAD ****************/

function addUnread() {
    gUnreadEmails++;
    utilService.saveToStorage(UNREAD_KEY, gUnreadEmails);
}

function removeUnread() {
    gUnreadEmails--;
    utilService.saveToStorage(UNREAD_KEY, gUnreadEmails);
}

function getUnread() {
    return gUnreadEmails;
}

/*************** MARK / UNMARK ****************/

function mark(emailId) {
    let email = getEmailById(emailId);
    email.isRead = false;
    utilService.saveToStorage(EMAILS_KEY, gEmails);

}

function unmark(emailId) {
    let email = getEmailById(emailId);
    email.isRead = true;
    utilService.saveToStorage(EMAILS_KEY, gEmails);

}

export default {
    addEmail,
    removeEmail,
    getEmailById,
    getEmails,
    getEmailsFiltered,
    addSent,
    removeSent,
    getEmailSentById,
    getEmailsSent,
    addUnread,
    removeUnread,
    getUnread,
    mark,
    unmark
}