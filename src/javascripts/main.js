"use strict";

import EventHandler from './EventHandler.js';

/**
 * @desc Dispatcher class
 */
class main {
    /**
     * @desc instantiates anonymous EventHandler
     */
    constructor() {
        new EventHandler();
        main.prepUX();
        main.loadServiceWorker();
    }

    /**
     * @desc Loads PWA service worker (ServiceWorker.js)
     */
    static loadServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('/serviceWorker.js')
                .then(() => {
                    console.log('Service Worker Registered');
                });
        }
    }

    /**
     * @desc Loads user experience (UX) in the DOM
     */
    static prepUX() {
        document.getElementById('dieQty').innerHTML = document.getElementById('slider').value;
    }
}

/**
 * @desc Program bootstrapper
 */
window.addEventListener('load', () => {
    new main();
});