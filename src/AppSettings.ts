type AppSettingsType = {
	dbPath: string;
	env: 'development' | 'production';
	appName: string;
};

export class AppSettings {
	private static instance: AppSettings;
	private settings: AppSettingsType;

	private constructor() {
		this.settings = {
			dbPath: 'app.db',
			env: 'development',
			appName: 'Room Booking Manager',
		};
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

	update(partial: Partial<AppSettingsType>) {
		this.settings = { ...this.settings, ...partial };
	}
}
