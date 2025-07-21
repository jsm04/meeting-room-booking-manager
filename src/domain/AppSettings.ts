export type AppSettingsType = {
	database_path: string;
	env_mode: 'development' | 'production';
	appName: string;
};

export class AppSettings {
	private static instance: AppSettings;
	private settings: AppSettingsType;

	private constructor() {
		this.settings = Object.freeze({
			database_path: process.env.DATABASE || '',
			env_mode: (process.env.NODE_ENV as AppSettingsType['env_mode']) || '',
			appName: 'Office Room Booking Manager',
		});
	}

	static getInstance(): AppSettings {
		if (!AppSettings.instance) {
			AppSettings.instance = new AppSettings();
		}
		return AppSettings.instance;
	}

	get(): AppSettingsType {
		return this.settings;
	}
}
