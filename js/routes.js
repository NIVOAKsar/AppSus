import about from './pages/about-cmp.js'
import home from './pages/home-cmp.js'

import keepSus from '/js/missKeep/pages/keep-sus-cmp.js';

import emailSus from '/js/misterEmail/pages/email-sus-cmp.js';
import emailInbox from '/js/misterEmail/cmps/email-inbox-cmp.js';
import emailSent from '/js/misterEmail/cmps/email-sent.cmp.js';
import emailSentDetails from '/js/misterEmail/cmps/email-sent-details-cmp.js';
import emailDetails from '/js/misterEmail/cmps/email-details-cmp.js';
import emailSend from '/js/misterEmail/cmps/email-send-cmp.js';



const routes = [
    { path: '/', component: home },
    { path: '/about', component: about },

    // ******************** mister Email *********************

    {
        path: '/email-sus',
        component: emailSus,
        children: [{
                path: 'email-inbox',
                component: emailInbox,
                // children: [{
                //     path: ':emailId',
                //     component: emailSent

                // }]
            },
            { path: 'email-sent', component: emailSent },
            { path: 'email-details/:id', component: emailDetails },
            { path: 'email-sent-details/:id', component: emailSentDetails },
            { path: 'email-send', component: emailSend }
        ]
    },


    // ******************** miss keep *********************

    { path: '/keep-sus', component: keepSus },
]

export default routes;