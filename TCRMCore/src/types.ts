/*
 * Copyright (c) 2020 FinancialForce.com, inc. All rights reserved.
 */
 
export type State = any;

export type Input = {
    getState: () => State,
    setState: (s: State) => void
};

export type Bundle = {
};