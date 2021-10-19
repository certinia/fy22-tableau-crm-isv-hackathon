/*
 * Copyright (c) 2020 FinancialForce.com, inc. All rights reserved.
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
        return bundle
    }

}