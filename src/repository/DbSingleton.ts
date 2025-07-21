import { Database } from 'bun:sqlite';

export class DB {
	private static instance: Database;

	private constructor() {}

	static getInstance(path = 'app.db'): Database {
		if (!DB.instance) {
			DB.instance = new Database(path);
		}
		return DB.instance;
	}
}
