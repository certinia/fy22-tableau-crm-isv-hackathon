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

    @track viewState = {
        error: "",
        previousEnabled: false,
        playPauseEnabled: false,
        nextEnabled: false,
        stepTitle: "",
        stepDescription: "", 
        paused: false,
        progressPercentage: 0
    }

    async connectedCallback() {
        // bundle
        const bundle = await loadBundle(this),
            model = bundle.createModel({
                title: cRef.title,
                config: cRef.config,
                getState: cRef.getState.bind(cRef),
                setState: cRef.setState.bind(cRef)
            });
        this.model = model;
        this.viewState = model.viewState;
    }

    get hasError() {
        return this.viewState.error != null;
    }

    get pausePlayIcon() {
        return this.viewState.paused ? "utility:play" : "utility:pause";
    }

    handlePausePlay() {
        this.model.playPause();
        this.viewState = model.viewState;
    }

    handleJumpLeft() {
        this.model.previous();
        this.viewState = model.viewState;
    }

    handleJumpRight() {
        this.model.next();
        this.viewState = model.viewState;
    }

}

export default Resonate;