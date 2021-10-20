/*
 * Copyright (c) 2021 FinancialForce.com, inc. All rights reserved.
 */

import { Config } from "../config/config";
import { Params, State } from "../types";
import clone from "clone";
import { parseConfig } from "../config/parse";
import { applyOperation, applyPatch, observe, Observer, Operation } from "fast-json-patch";

export enum EngineStateType {
    Normal = "normal",
    Error = "error"
}

export type EngineStateNormal = {
    type: EngineStateType.Normal;
    params: Params;
    config: Config;
    paused: boolean;
    inverses: Array<Array<Operation>>
    step: {
        index: number;
        elapsedTime: number;
    }
}

export type EngineStateError = {
    type: EngineStateType.Error;
    params: Params;
    message: string
}

export type EngineState = EngineStateNormal | EngineStateError;

export function fromParams(p: Params): EngineState {
    try {
        const config: Config = parseConfig(p.config);
        return {
            type: EngineStateType.Normal,
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
            type: EngineStateType.Error,
            params: p,
            message: err.message
        };
    }

}

export function playPause(s: EngineState): EngineState {
    switch (s.type) {
        case EngineStateType.Error:
            return clone(s);
        case EngineStateType.Normal:
            return {
                ...clone(s),
                paused: !s.paused
            };
    }
}

export function tick(s: EngineState): EngineState {
    switch (s.type) {
        case EngineStateType.Error:
            return clone(s);
        case EngineStateType.Normal: {
            const newState: EngineStateNormal = clone(s);
            const newStateAfterTick: EngineStateNormal = {
                ...newState,
                step: {
                    ...newState.step,
                    elapsedTime: newState.step.elapsedTime + 1
                }
            };
            if (newStateAfterTick.step.elapsedTime >= newStateAfterTick.config.steps[newStateAfterTick.step.index].time) {
                return next(newStateAfterTick);
            }
            return newStateAfterTick;
        }
    }
}

export function previous(s: EngineState): EngineState {
    switch (s.type) {
        case EngineStateType.Error:
            return clone(s);
        case EngineStateType.Normal: {
            const newState: EngineStateNormal = clone(s),
                currentStepIndex: number = newState.step.index;
            let nextStepIndex: number = currentStepIndex - 1;
            if (nextStepIndex < 0) {
                nextStepIndex = 0;
            }
            const resultState: EngineStateNormal = {
                ...newState,
                step: {
                    index: nextStepIndex,
                    elapsedTime: 0
                }
            };
            return resultState;
        }
    }
}

export function next(s: EngineState): EngineState {
    switch (s.type) {
        case EngineStateType.Error:
            return clone(s);
        case EngineStateType.Normal: {
            const newState: EngineStateNormal = clone(s),
                currentStepIndex: number = newState.step.index;
            let nextStepIndex: number = currentStepIndex + 1;
            if (nextStepIndex > newState.config.steps.length - 1) {
                nextStepIndex = newState.config.steps.length - 1;
            }
            const resultState: EngineStateNormal = {
                ...newState,
                paused: nextStepIndex === newState.config.steps.length - 1,
                step: {
                    index: nextStepIndex,
                    elapsedTime: 0
                }
            };
            return resultState;
        }
    }
}

function applyStateStepTransition(s: EngineStateNormal, forward: boolean): Array<Operation> | null {
    const index: number = s.step.index;

    if (forward) {
        const steps: Array<Operation> = s.config.steps[index].operations; 
        let state: State = s.params.getState();
        const changes: Array<Operation> = [];
        const observer: Observer<unknown> = observe(state, (patches: Array<Operation>) => {
            changes.push(...patches);
        })
        applyPatch(state, steps, false, true);
        observer.unobserve();
        s.params.setState(state);
        return changes; 
    }

    if (!forward) {
        const steps: Array<Operation> = s.inverses[index]; 
        let state: State = s.params.getState();
        applyPatch(state, steps, false, true);
        s.params.setState(state);
    }

    return null;
}