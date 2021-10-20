/*
 * Copyright (c) 2021 FinancialForce.com, inc. All rights reserved.
 */

import Engine from "./engine/core";
import { Params } from "./types";

export function createEngine(input: Params): Engine {
    return new Engine(input);
}