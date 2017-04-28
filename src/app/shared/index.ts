import { TrackDurationPipe } from './duration-pipe';
import { ResultsPipe } from './results-pipe';
import { LimitPipe } from './limit-pipe';
import { ExternalHrefPipe } from './external-href-pipe';

export const pipes = [
  TrackDurationPipe,
  ResultsPipe,
  LimitPipe,
  ExternalHrefPipe,
];
export * from './simple-breadcrumbs.component';
export * from './error-message';
export { SimpleErrorComponent } from './simple-error.component';