/*
 * Copyright (c) 2020 FinancialForce.com, inc. All rights reserved.
 */

import { Input, Bundle } from "./types";

export async function createBundle(input: Input): Promise<Bundle> {
    return {
        test: JSON.stringify(input.getState())
    };
}