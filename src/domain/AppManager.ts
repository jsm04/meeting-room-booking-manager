export type AppSettingsType = {
	database_path: string
	env_mode: 'development' | 'production'
	app_name: string
	port?: string
	admin_email?: string
	log_level?: 'debug' | 'info' | 'warn' | 'error'
	enable_cache?: boolean
	default_locale?: string
	timezone?: string
	version?: string
}

type AppSettingsOverriableType = {
	port?: string
	log_level?: 'debug' | 'info' | 'warn' | 'error'
	enable_cache?: boolean
}

export class AppManager {
	private static instance: AppManager
	private settings: AppSettingsType

	private constructor(override?: AppSettingsOverriableType) {
		this.settings = {
			database_path: process.env.DB_PATH || '',
			env_mode: (process.env.NODE_ENV as AppSettingsType['env_mode']) || '',
			version: process.env.VERSION || '',
			port: process.env.PORT,
			app_name: 'Meeting Room Booking Manager',
		}

		this.settings.env_mode == 'development'
			? (this.settings.log_level = 'debug')
			: (this.settings.log_level = 'error')

		Object.assign(this.settings, override)
		Object.freeze(this.settings)
	}

	static getInstance(): AppManager {
		if (!AppManager.instance) {
			AppManager.instance = new AppManager()
		}
		return AppManager.instance
	}

	get state(): AppSettingsType {
		return this.settings
	}

}
