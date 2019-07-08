import { createAction, props } from '@ngrx/store';
import { TeamState } from '../reducers/team.reducer';

export const updateTeam = createAction('[Team] Update Team Info', props<{payload: TeamState}>() );
