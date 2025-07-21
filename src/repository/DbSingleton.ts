import { Database } from 'bun:sqlite';
import { AppSettings } from '../domain/AppSettings';

export class DB {
	private static volatile_instance: Database;
	private static persistence_instance: Database;

	private constructor() {}

	static getInstance(type: 'volatile' | 'persistency' = 'volatile'): Database {
		const settings = AppSettings.getInstance().get();

		if (type === 'persistency') {
			if (!DB.persistence_instance) {
				DB.persistence_instance = new Database(settings.persistentDatabase);
			}
			return DB.persistence_instance;
		}

		if (!DB.volatile_instance) {
			DB.volatile_instance = new Database(':memory:', {
				create: true,
				readwrite: true,
				safeIntegers: true,
				strict: true,
			});
		}
		return DB.volatile_instance;
	}
}
