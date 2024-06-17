import { AppConfigService } from "@core/services/app-config.service";

export function LoadApplicationConfiguration(appConfigService: AppConfigService) {
    return () => appConfigService.loadPortalConfiguration();
}