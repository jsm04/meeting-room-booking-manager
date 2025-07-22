import { Database } from 'bun:sqlite'
import { AppSettings } from '../domain/AppSettings'

export class DB {
	private static app_settings = AppSettings.getInstance().get()
	private static in_memory_instance: Database
	private static instance: Database

	private constructor() {}

	static getInstance(type: 'volatile' | 'main' = 'main'): Database {
		if (type === 'main') {
			if (!DB.instance) {
				DB.instance = new Database(this.app_settings.database_path)
			}
			return DB.instance
		}

		if (!DB.in_memory_instance) {
			DB.in_memory_instance = new Database(':memory:', {
				create: true,
				readwrite: true,
				safeIntegers: true,
				strict: true,
			})
		}
		return DB.in_memory_instance
	}
}
