import about from './pages/about-cmp.js'
import home from './pages/home-cmp.js'

import keepSus from './missKeep/pages/keep-sus-cmp.js';

import emailSus from './misterEmail/pages/email-sus-cmp.js'
import emailInbox from './misterEmail/cmps/email-inbox-cmp.js';
import emailSent from './misterEmail/cmps/email-sent.cmp.js';
import emailTrash from './misterEmail/cmps/email-trash-cmp.js';
// import emailStarred from '/js/misterEmail/cmps/email-starred.cmp.js';

import emailSentDetails from './misterEmail/cmps/email-sent-details-cmp.js';
import emailTrashDetails from './misterEmail/cmps/email-trash-details-cmp.js';
// import emailStarredDetails from '/js/misterEmail/cmps/email-starred-details-cmp.js';

import emailDetails from './misterEmail/cmps/email-details-cmp.js';
import emailSend from './misterEmail/cmps/email-send-cmp.js';


const routes = [
    { path: '/', component: home },
    { path: '/about', component: about },

    // ******************** mister Email *********************
    {
        path: '/email-sus',
        component: emailSus,
        children:
            [
                /******************** Inbox *********************/
                { path: 'email-inbox', component: emailInbox },
                { path: 'email-details/:id', component: emailDetails },
                /******************** Sent *********************/
                { path: 'email-sent', component: emailSent },
                { path: 'email-sent-details/:id', component: emailSentDetails },
                /******************** Trash *********************/
                { path: 'email-trash', component: emailTrash },
                { path: 'email-trash-details/:id', component: emailTrashDetails },
                /******************** Send *********************/
                { path: 'email-send', component: emailSend },
                /******************** Starred *********************/
                // { path: 'email-starred', component: emailStarred },
                // { path: 'email-starred-details/:id', component: emailStarredDetails },

            ]
    },

    // ******************** miss keep *********************

    { path: '/keep-sus', component: keepSus },
]

export default routes;