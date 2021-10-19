/*
 * Copyright (c) 2021 FinancialForce.com, inc. All rights reserved.
 */
 
export type State = any;

export type Params = {
    config: string,
    title: string,
    getState: () => State,
    setState: (s: State) => void
};

export type Bundle = {
    autoplayEnabled: BundleAutoPlayEnabledFunction
};


type BundleAutoPlayEnabledFunction = () => boolean;