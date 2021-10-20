/*
 * Copyright (c) 2021 FinancialForce.com, inc. All rights reserved.
 */

import { ModelState, ModelStateType } from "./state";

export type ViewState = {
    error: string | null;
    previousDisabled: boolean;
    playPauseDisabled: boolean;
    nextDisabled: boolean;
    stepTitle: string;
    stepDescription: string; 
    paused: boolean;
    progressPercentage: number;
}

export function viewStateFromState(s: ModelState): ViewState {
    switch (s.type) {
        case ModelStateType.Error:
            return {
                error: s.message,
                previousDisabled: true,
                playPauseDisabled: true,
                nextDisabled: true,
                stepTitle: "",
                stepDescription: "",
                paused: true,
                progressPercentage: 0
            };
        case ModelStateType.Normal:
            return {
                error: null,
                previousDisabled: s.step.index <= 0,
                playPauseDisabled: false,
                nextDisabled: s.step.index >= s.config.steps.length - 1,
                stepTitle: s.config.steps[s.step.index].title,
                stepDescription: s.config.steps[s.step.index].description,
                paused: s.paused,
                progressPercentage: s.paused ? 0 : (s.step.elapsedTime / s.config.steps[s.step.index].time) * 100
            };
    }

}