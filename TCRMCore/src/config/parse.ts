/*
 * Copyright (c) 2021 FinancialForce.com, inc. All rights reserved.
 */

import { Config, ConfigSchema } from "./config";
import { ValidationError, Validator } from "jsonschema";

function jsonParseError(): never {
    throw new Error("The config field must be a valid json object");
}

function humanReadableValidationError(err: ValidationError): never {
    const message: string = `Validation failed for config, path: "${err.path.join(".")}", property: "${err.property}", message: "${err.message}"`;
    throw new Error(message);
}

export function parseConfig(config: string): Config {
    let parsedJson: unknown;
    try {
        parsedJson = JSON.parse(config);
    } catch (err) {
        jsonParseError();
    }
    try {
        const validator = new Validator();
        validator.validate(parsedJson, ConfigSchema, {
            throwError: true,
            throwAll: true
        });
    } catch (err) {
        humanReadableValidationError(err);
    }
    return parsedJson as Config;
}