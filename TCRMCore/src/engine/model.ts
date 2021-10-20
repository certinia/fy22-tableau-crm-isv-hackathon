/*
 * Copyright (c) 2021 FinancialForce.com, inc. All rights reserved.
 */

import { Params } from "../types";
import { ModelState, fromParams, next, playPause, previous, tick } from "./state";
import { viewStateFromState } from "./viewState";

class Model {

    private state: ModelState;

    get viewState() {
        return viewStateFromState(this.state);
    }

    constructor(p: Params) {
        this.state = fromParams(p);
    }

    playPause(): void {
        this.state = playPause(this.state);
    }

    previous(): void {
        this.state = previous(this.state);
    }

    next(): void {
        this.state = next(this.state);
    }

    tick(): void {
        this.state = tick(this.state);
    }

}

export default Model;