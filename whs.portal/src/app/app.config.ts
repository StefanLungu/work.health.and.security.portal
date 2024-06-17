import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoadApplicationConfiguration } from '@core/factories/app-config.factory';
import { AppConfigService } from '@core/services/app-config.service';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		provideAnimationsAsync(),
		provideHttpClient(),
		{
			provide: APP_INITIALIZER,
			useFactory: LoadApplicationConfiguration,
			deps: [AppConfigService],
			multi: true
		},
		{
			provide: MAT_DATE_LOCALE,
			useValue: 'ro-RO'
		},
	]
};
