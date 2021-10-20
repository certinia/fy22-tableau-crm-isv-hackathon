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

    async connectedCallback() {
        // bundle
        const bundle = await loadBundle(this),
            engine = bundle.createEngine({
                title: cRef.title,
                config: cRef.config,
                getState: cRef.getState.bind(cRef),
                setState: cRef.setState.bind(cRef)
            });
        this.engine = engine;
    }

    get ready() {
        this.engine != null;
    }

    get hasError() {
        return this.error != null;
    }

    get error() {
        return this.error.message;
    }

    get showStepRegion() {
        return !this.hasError && this.ready;
    }

    get pausePlayIcon() {
        return (this.engine && this.engine.paused) ? "utility:play" : "utility:pause";
    }

    get buttonsDisabled() {
        return !this.ready || this.hasError || !this.engine.buttonsEnabled;
    }

    get stepTitle() {
        return this.engine.stepTitle;
    }

    get stepDescription() {
        return this.engine.stepDescription;
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