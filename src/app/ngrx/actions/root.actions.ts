import { createAction, props } from '@ngrx/store';
import { AppStore } from '../reducers/root.reducer';

export const hydrate = createAction('[Hydrate] Hydrate State', props<{payload: AppStore}>() );
