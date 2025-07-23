import { Database } from 'bun:sqlite'
import { AppManager } from '../domain/AppManager'
import { MockUtils } from '../domain/MockUtils'

export class DatabaseAccess {
	private static app_settings = AppManager.getInstance().state
	private static cache_instance: Database
	private static instance: Database

	static getInstance(type: 'volatile' | 'main' = 'main'): Database {
		if (type === 'main') {
			if (!DatabaseAccess.instance) {
				DatabaseAccess.instance = new Database(this.app_settings.database_path)
				this.configure(DatabaseAccess.instance)
			}
			return DatabaseAccess.instance
		}

		if (!DatabaseAccess.cache_instance) {
			DatabaseAccess.cache_instance = new Database(':memory:', {
				create: true,
				readwrite: true,
				safeIntegers: true,
				strict: true,
			})
			this.configure(DatabaseAccess.cache_instance)
		}
		return DatabaseAccess.cache_instance
	}

	private static configure(instance: Database) {
		// Enable SQL WAL mode
		// ref: https://bun.sh/docs/api/sqlite#wal-mode
		instance.exec('PRAGMA journal_mode = WAL;')
	}
}
