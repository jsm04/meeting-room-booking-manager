import { DB } from './DbSingleton'
import { Database } from 'bun:sqlite'

export abstract class BaseRepository {
	protected db: Database = DB.getInstance()

	constructor(protected table_name: string) {
		this.table_name = table_name
		this.createTable()
	}
	protected abstract createTable(): void
}
