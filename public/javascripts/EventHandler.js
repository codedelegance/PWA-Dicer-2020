"use strict";

/**
 * @module EventHandler
 */

/**
 * @desc Class that handles all DOM events. Performs all fetch operations
 */
export default class EventHandler {
    #dieType;
    #dieQty;

    /**
     * @desc Starts select event listeners
     */
    constructor() {
        this.setDieQty();
        this.setDieType();
        this.handleDiceRoll();
    }

    /**
     * @desc Mutator for #dieQty
     */
    setDieQty() {
        this.#dieQty = 0;
        document.getElementById('slider').addEventListener('input', async () => {
            try {
                document.getElementById('dieQty').innerText = await document.getElementById('slider').value;
                this.#dieQty = await document.getElementById('slider').value;
            } catch (error) {
                console.log(error);
            }
        });
    }

    /**
     * @desc Mutator for #dieType
     */
    setDieType() {
        this.#dieType = 0;
        const dieTypes = document.forms["rollResults"].elements["dieType"];
        for (let i = 0; i < dieTypes.length; i++) {
            dieTypes[i].addEventListener('click', async (event) => {
                event.stopImmediatePropagation();
                try {
                    this.#dieType = await dieTypes[i].value;
                } catch (error) {
                    console.log(error);
                }
            });
        }
    }

    /**
     * @desc Worker method to roll dice
     */
    handleDiceRoll() {
        document.getElementById('rollButton').addEventListener('click', async (event) => {
            event.stopImmediatePropagation();
            let finalResult = 0;
            let individuals = '';
            let results = [];
            for (let i = 0; i < this.#dieQty; i++) {
                results[i] = Math.floor((Math.random() * this.#dieType) + 1);
                finalResult += Number(results[i]);
                if (i < this.#dieQty - 1) {
                    individuals += results[i] + ', ';
                } else {
                    individuals += results[i];
                }
            }
            try {
                document.getElementById('results').innerText = await individuals;
                document.getElementById('totalResult').innerText = await String(finalResult);
            } catch (error) {
                console.log(error);
            }
        });
    }
}