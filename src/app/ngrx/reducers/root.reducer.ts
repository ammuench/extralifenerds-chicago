import { donationReducer, DonationState, donationState } from './donations.reducer';
import { teamReducer, TeamState, teamState } from './team.reducer';
import { hydrate } from '../actions/root.actions';

export type AppStore = {
    donations: DonationState,
    team: TeamState,
}

const initialState: AppStore = {
    donations: donationState,
    team: teamState
}

export function rootReducer(state: AppStore = initialState, action: { type: string, payload: any }): AppStore {
    switch (action.type) {
        case hydrate.type:
            return Object.assign({}, state, action.payload)
        default:
            return {
                donations: donationReducer(state.donations, action),
                team: teamReducer(state.team, action),
            };
    }
}