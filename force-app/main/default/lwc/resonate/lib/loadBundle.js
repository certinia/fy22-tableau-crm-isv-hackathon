/*
 * Copyright (c) 2021 FinancialForce.com, inc. All rights reserved.
 */

import bundleUrl from '@salesforce/resourceUrl/tcrmCore';
import { loadScript } from 'lightning/platformResourceLoader';


let bundle = null;
export async function loadBundle(cRef) {
    if(!bundle) {
        await loadScript(cRef, bundleUrl);
        if(!bundle) {
            bundle = window.tcrmCore;
        }
        return await bundle.createBundle({
            title: cRef.title,
            config: cRef.config,
            getState: cRef.getState.bind(cRef),
            setState: cRef.setState.bind(cRef)
        });
    }

}