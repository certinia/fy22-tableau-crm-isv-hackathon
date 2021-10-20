/*
 * Copyright (c) 2021 FinancialForce.com, inc. All rights reserved.
 */

import { Params } from "../types";
import { EngineState, fromParams, next, playPause, previous, tick } from "./state";

class Engine {

    private state: EngineState;

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

export default Engine;