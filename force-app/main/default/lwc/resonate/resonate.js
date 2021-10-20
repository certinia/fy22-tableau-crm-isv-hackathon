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

    model;

    cachedState = { mock: "state" };

    @track viewState = {
        error: "",
        previousDisabled: false,
        playPauseDisabled: false,
        nextDisabled: false,
        stepTitle: "",
        stepDescription: "", 
        paused: false,
        progressPercentage: 0
    }

    async connectedCallback() {
        // bundle
        const bundle = await loadBundle(this),
            model = bundle.createModel({
                title: this.title,
                config: this.config,
                getState: this.getStateFromEA.bind(this),
                setState: this.setStateToEA.bind(this)
            });
        this.model = model;
        this.viewState = model.viewState;
        setInterval(() => this.tick(), 1000);
    }

    get hasError() {
        return this.viewState.error != null;
    }

    get pausePlayIcon() {
        return this.viewState.paused ? "utility:play" : "utility:pause";
    }

    /**
     * So I can't properly pass the get/setState functions to TS, need this hack
     */

    readCachedState() {
        this.cachedState = this.getState();
    }

    writeCachedState() {
        this.setState(this.cachedState);
    }

    getStateFromEA() {
        return this.cachedState;
    }

    setStateToEA(s) {
        this.cachedState = s;
    }

    // end nasty hack

    tick() {
        this.readCachedState();
        this.model.tick();
        this.viewState = this.model.viewState;
        this.writeCachedState();
    }

    handlePausePlay() {
        this.readCachedState();
        this.model.playPause();
        this.viewState = this.model.viewState;
        this.writeCachedState();
    }

    handleJumpLeft() {
        this.readCachedState();
        this.model.previous();
        this.viewState = this.model.viewState;
        this.writeCachedState();
    }

    handleJumpRight() {
        this.readCachedState();
        this.model.next();
        this.viewState = this.model.viewState;
        this.writeCachedState();
    }

}

export default Resonate;