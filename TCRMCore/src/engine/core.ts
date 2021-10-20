/*
 * Copyright (c) 2021 FinancialForce.com, inc. All rights reserved.
 */

import { Config } from "../config/config";
import { GetStateFunction, SetStateFunction } from "../types";

class Engine {

    private config: Config;
    private getState: GetStateFunction;
    private setState: SetStateFunction;
    private running = true;
    private step = 0;

    get buttonsEnabled(): boolean {
        return this.config.steps.length > 1;
    }

    get paused(): boolean {
        return !this.running;
    }

    get stepTitle(): string {
        return this.config.steps[this.step].title;
    }

    get stepDescription(): string {
        return this.config.steps[this.step].description;
    }

    constructor(config: Config, getState: GetStateFunction, setState: SetStateFunction) {
        this.config = config;
        this.getState = getState;
        this.setState = setState;
        this.running = config.autoplay;
    }

    pausePlay(): void {
        this.running = !this.running;
    }

    previous(): void {
        this.step -= 1;
        if (this.step < 0) {
            this.step = 0;
        }
    }

    next(): void {
        this.step += 1;
        if (this.step > this.config.steps.length - 1) {
            this.step = this.config.steps.length - 1;
        }
    }


}

export default Engine;