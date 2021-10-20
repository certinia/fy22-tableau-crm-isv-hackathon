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
    @track ready = false;
    @track state = null;

    async connectedCallback() {
        // bundle
        try {
            this.engine = await loadBundle(this).engine;
        } catch (err) {
            this.error = err;
        }
        this.ready = true;

    }

    get hasError() {
        return this.error != null;
    }

    get error() {
        return this.error.message;
    }

    get pausePlayIcon() {
        return (this.engine && this.engine.paused) ? "utility:play" : "utility:pause";
    }

    get buttonsDisabled() {
        return !this.ready || this.hasError || !this.engine.buttonsEnabled;
    }

    handleRefresh() {
        this.state = JSON.stringify(this.getState());
    }

    handlePausePlay() {
        this.engine.pausePlay();
    }

    handleJumpLeft() {
        this.engine.previous();
    }

    handleJumpRight() {
        this.engine.next();
    }

}

export default Resonate;