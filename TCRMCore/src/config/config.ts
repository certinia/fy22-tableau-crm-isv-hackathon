/*
 * Copyright (c) 2021 FinancialForce.com, inc. All rights reserved.
 */

import { Schema } from "jsonschema";

export type Config = {
    autoplay: boolean;
    steps: Array<ConfigStep>;
};

export type ConfigStep = {
    title: string;
    description: string;
    operations: Array<any>;
};

export const ConfigSchema: Schema = {
    id: "/Config",
	type: "object",
	required: true,
    additionalProperties: false,
	properties: {
        autoplay: { type: "boolean", required: true },
        steps: {
            type: "array",
            required: true,
            items: {
                type: "object",
                required: true,
                additionalProperties: false,
                properties: {
                    title: { type: "string", required: true, minLength: 1 },
                    description: { type: "string", required: true, minLength: 1 },
                    operations: {
                        type: "array",
                        required: true,
                        items: {
                            type: "object",
                            required: true,
                            additionalProperties: false
                        }
                    } 
                }
            }
        },
    }
};


