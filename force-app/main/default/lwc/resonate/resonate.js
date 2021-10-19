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

    bundle;

    @track state = "";
    @track error = null;

    async connectedCallback() {
        try {
            this.bundle = await loadBundle(this);
        } catch (err) {
            this.error = err;
        }
    }

    get hasError() {
        return this.error != null;
    }

    get error() {
        return this.error.message;
    }

    handleRefresh() {
        this.state = JSON.stringify(this.getState());
    }

}

export default Resonate;