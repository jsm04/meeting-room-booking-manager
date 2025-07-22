import { AppManager } from '../domain/AppManager'
import { DatabaseAccess } from './DatabaseSingleton'
import { Database } from 'bun:sqlite'

export abstract class BaseRepository<T> {
	protected db: Database = DatabaseAccess.getInstance()
	protected appManager = AppManager.getInstance()
	protected table_name = 'string'

	protected abstract createTable(): void
	protected abstract create(entity: T): T | null
	protected abstract update(user: T): T | null
	protected abstract delete(id: string): T | null
	protected abstract getById(id: string): T | null
	protected abstract getAll(): T[]
	// protected abstract getManyByIds(ids: string[]): T[]

	exists(id: string): boolean {
		const result = this.db.query(`SELECT 1 FROM ${this.table_name} WHERE id = $id LIMIT 1`).get({ $id: id })
		return !!result
	}

	count(): number {
		const row = this.db.query(`SELECT COUNT(*) as count FROM ${this.table_name}`).get() as
			| { count: number }
			| undefined
		return row?.count ?? 0
	}

	clear(): void {
		if (this.appManager.is_dev) this.db.run(`DELETE FROM ${this.table_name}`)
		else throw Error('This wipes the entire table. Dont use in prod. STOP.')
	}

	find(filterFn: (entity: T) => boolean): T[] {
		return this.getAll().filter(filterFn)
	}
}
