/*
 * Copyright (c) 2021 FinancialForce.com, inc. All rights reserved.
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

    async connectedCallback() {
        this.bundle = JSON.stringify(await loadBundle(this));
        this.state = JSON.stringify(this.getState());
    }

    handleRefresh() {
        this.state = JSON.stringify(this.getState());
    }

}

export default Resonate;