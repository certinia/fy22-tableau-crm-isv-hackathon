/*
 * Copyright (c) 2021 FinancialForce.com, inc. All rights reserved.
 */

import { Config } from "./config/config";
import { parseConfig } from "./config/parse";
import Engine from "./engine/core";
import { Params, Bundle } from "./types";

export async function createBundle(input: Params): Promise<Bundle> {
    const config: Config = parseConfig(input.config),
        engine: Engine = new Engine(config, input.getState, input.setState);

    return {
        engine
    };
}