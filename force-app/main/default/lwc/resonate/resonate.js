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

    engine;

    @track error = null;
    @track paused = true;
    @track state = null;

    async connectedCallback() {
        // bundle
        try {
            this.engine = await loadBundle(this);
        } catch (err) {
            this.error = err;
        }
        // init
        this.paused = !this.engine.autoplayEnabled();

    }

    get hasError() {
        return this.error != null;
    }

    get pausePlayIcon() {
        return this.paused ? "utility:play" : "utility:pause";
    }

    get error() {
        return this.error.message;
    }


    handleRefresh() {
        this.state = JSON.stringify(this.getState());
    }

    handlePausePlay() {
        this.paused = !this.paused;
    }

    handleJumpLeft() {
        
    }

    handleJumpRight() {
        
    }

}

export default Resonate;