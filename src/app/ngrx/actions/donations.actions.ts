import { createAction, props } from '@ngrx/store';
import { DonationState } from '../reducers/donations.reducer';

export const updateDonations = createAction('[Donations] Update Donation Amounts', props<{payload: DonationState}>() );
