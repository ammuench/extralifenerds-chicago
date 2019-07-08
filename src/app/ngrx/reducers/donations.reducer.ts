import { createAction, props } from '@ngrx/store';
import { updateDonations } from '../actions/donations.actions';

export type DonationState = {
    current: number;
    goal: number;
}

export const donationState: DonationState = {
    current: 0,
    goal: 0,
}

export function donationReducer(state = donationState, action: { type: string, payload: any }): DonationState {
    switch (action.type) {
        case updateDonations.type:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}