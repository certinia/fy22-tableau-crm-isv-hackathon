/*
 * Copyright (c) 2021 FinancialForce.com, inc. All rights reserved.
 */

import Model from "./engine/model";
import { Params } from "./types";

export function createModel(input: Params): Model {
    return new Model(input);
}