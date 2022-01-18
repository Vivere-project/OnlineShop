import { InjectionToken, inject } from "@angular/core";
import {DOCUMENT} from "@angular/common";

export const WINDOW = new InjectionToken<Window>(
  'An abstraction over global window object',
  {
    factory: () => {
      const {defaultView} = inject(DOCUMENT);

      if (!defaultView) {
        throw new Error('Window is not available');
      }

      return defaultView;
    },
  },
);


export const LOCAL_STORAGE = new InjectionToken<Storage>('Local storage', {
  factory: () => inject(WINDOW).localStorage
});

