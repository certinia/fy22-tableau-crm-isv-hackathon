/*
 * Copyright (c) 2021 FinancialForce.com, inc. All rights reserved.
 */

import { Schema } from "jsonschema";
import { AddOperation, RemoveOperation, ReplaceOperation, MoveOperation, CopyOperation } from "fast-json-patch";

export type Config = {
    autoplay: boolean;
    steps: Array<ConfigStep>;
};

export type ConfigStep = {
    title: string;
    description: string;
    operations: Array<ConfigOperation>;
};

export type ConfigOperation = AddOperation<any> | RemoveOperation | ReplaceOperation<any> | MoveOperation | CopyOperation;

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
            minItems: 1,
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
                            additionalProperties: false,
                            properties: {
                                path: { type: "string", required: true, minLength: 1 },
                                op: { 
                                    type: "string", 
                                    required: true, 
                                    enum: ["add", "remove", "replace", "move", "copy"] 
                                },
                                value: {
                                    type: ["number","string","boolean","object","array", "null"],
                                }
                            },
                            if: {
                                properties: {
                                    op: {
                                        enum: ["add", "replace"]
                                    }
                                }
                            },
                            then: {
                                required: [
                                    "value"
                                ]
                            }
                        }
                    } 
                }
            }
        },
    }
};


