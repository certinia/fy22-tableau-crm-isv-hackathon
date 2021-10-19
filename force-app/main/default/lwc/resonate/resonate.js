/*
 * Copyright (c) 2020 FinancialForce.com, inc. All rights reserved.
 */

import { LightningElement, api, track } from "lwc";
import { loadBundle } from "./lib/loadBundle";

class Resonate extends LightningElement {

    @api title;
    @api config;
    @api getState;
    @api setState;

    @track state;
    @track bundle;
    @track store;

    async connectedCallback() {
        if (!window.ffdcStore) {
            window.ffdcStore = "Secret" + Math.random();
        }
        this.bundle = JSON.stringify(await loadBundle(this));
        this.state = JSON.stringify(this.getState());
        this.store = window.ffdcStore;
    }

    handleRefresh() {
        this.state = JSON.stringify(this.getState());
    }

}

export default Resonate;