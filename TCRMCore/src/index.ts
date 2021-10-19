/*
 * Copyright (c) 2021 FinancialForce.com, inc. All rights reserved.
 */

import { Params, Bundle } from "./types";

export async function createBundle(input: Params): Promise<Bundle> {
    return {
        test: JSON.stringify(input.getState())
    };
}