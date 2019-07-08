import { createAction, props } from '@ngrx/store';
import { IExtraLifeUser } from 'extra-life-api';
import { updateTeam } from '../actions/team.actions';

export type TeamState = {
    roster: IExtraLifeUser[];
}

export const teamState: TeamState = {
    roster: [],
}

export function teamReducer(state = teamState, action: { type: string, payload: any }): TeamState {
    switch (action.type) {
        case updateTeam.type:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}