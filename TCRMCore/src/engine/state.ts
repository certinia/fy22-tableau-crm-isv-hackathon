/*
 * Copyright (c) 2021 FinancialForce.com, inc. All rights reserved.
 */

import { Config } from "../config/config";
import { Params, State } from "../types";
import clone from "clone";
import { parseConfig } from "../config/parse";
import { applyOperation, applyPatch, compare, observe, Observer, Operation } from "fast-json-patch";

export enum ModelStateType {
    Normal = "normal",
    Error = "error"
}

export type ModelStateNormal = {
    type: ModelStateType.Normal;
    params: Params;
    config: Config;
    paused: boolean;
    inverses: Array<Array<Operation>>
    step: {
        index: number;
        elapsedTime: number;
    }
}

export type ModelStateError = {
    type: ModelStateType.Error;
    params: Params;
    message: string
}

export type ModelState = ModelStateNormal | ModelStateError;

export function fromParams(p: Params): ModelState {
    try {
        const config: Config = parseConfig(p.config);
        return {
            type: ModelStateType.Normal,
            params: p,
            config,
            paused: !config.autoplay,
            inverses: [],
            step: {
                index: 0,
                elapsedTime: 0
            }
        };
    } catch (err) {
        return {
            type: ModelStateType.Error,
            params: p,
            message: err.message
        };
    }

}

export function playPause(s: ModelState): ModelState {
    switch (s.type) {
        case ModelStateType.Error:
            return clone(s);
        case ModelStateType.Normal:
            return {
                ...clone(s),
                paused: !s.paused
            };
    }
}

export function tick(s: ModelState): ModelState {
    switch (s.type) {
        case ModelStateType.Error:
            return clone(s);
        case ModelStateType.Normal: {
            if (s.paused) {
                return clone(s);
            }
            const newState: ModelStateNormal = clone(s);
            const newStateAfterTick: ModelStateNormal = {
                ...newState,
                step: {
                    ...newState.step,
                    elapsedTime: newState.step.elapsedTime + 10
                }
            };
            if (newStateAfterTick.step.elapsedTime >= newStateAfterTick.config.steps[newStateAfterTick.step.index].time) {
                return next(newStateAfterTick);
            }
            return newStateAfterTick;
        }
    }
}

export function previous(s: ModelState): ModelState {
    switch (s.type) {
        case ModelStateType.Error:
            return clone(s);
        case ModelStateType.Normal: {
            const newState: ModelStateNormal = clone(s),
                currentStepIndex: number = newState.step.index;
            let nextStepIndex: number = currentStepIndex - 1;
            if (nextStepIndex < 0) {
                nextStepIndex = 0;
            }
            const resultState: ModelStateNormal = {
                ...newState,
                step: {
                    index: nextStepIndex,
                    elapsedTime: 0
                }
            };
            if (nextStepIndex < currentStepIndex) {
                applyStateStepTransition(resultState, false);
            }
            return resultState;
        }
    }
}

export function next(s: ModelState): ModelState {
    switch (s.type) {
        case ModelStateType.Error:
            return clone(s);
        case ModelStateType.Normal: {
            const newState: ModelStateNormal = clone(s),
                currentStepIndex: number = newState.step.index;
            let nextStepIndex: number = currentStepIndex + 1;
            if (nextStepIndex > newState.config.steps.length - 1) {
                nextStepIndex = newState.config.steps.length - 1;
            }
            let newInverses: Array<Operation> | null = null;
            if (nextStepIndex > currentStepIndex) {
                newInverses = applyStateStepTransition(s, true);
            }
            const resultState: ModelStateNormal = {
                ...newState,
                paused: nextStepIndex === newState.config.steps.length - 1,
                inverses: newInverses ? newState.inverses.concat([newInverses]) : newState.inverses,
                step: {
                    index: nextStepIndex,
                    elapsedTime: 0
                }
            };
            return resultState;
        }
    }
}

function applyStateStepTransition(s: ModelStateNormal, forward: boolean): Array<Operation> | null {
    const index: number = s.step.index;

    if (forward) {
        const steps: Array<Operation> = s.config.steps[index].operations; 
        let state: State = s.params.getState(),
            copied: State = clone(state);
        applyPatch(copied, steps, false, true);
        s.params.setState(copied);
        return compare(copied, state); 
    }

    if (!forward) {
        const steps: Array<Operation> = s.inverses[index]; 
        let state: State = s.params.getState();
        applyPatch(state, steps, false, true);
        s.params.setState(state);
    }

    return null;
}