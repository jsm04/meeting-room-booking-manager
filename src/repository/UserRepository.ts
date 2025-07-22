import SQLite, { Database } from 'bun:sqlite'
import { User } from '../model/User'
import { DatabaseAccess } from './DatabaseSingleton'
import { BaseRepository } from './BaseRepository'

export class UserRepository extends BaseRepository<User> {
	table_name = 'users'

	constructor() {
		super()
		this.createTable()
	}

	protected createTable() {
		this.db.run(`
      CREATE TABLE IF NOT EXISTS ${this.table_name} (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE
      )
    `)
	}

	create(user: User): User | null {
		try {
			this.db.run(`INSERT INTO ${this.table_name} (id, name, email) VALUES (?, ?, ?)`, [
				user.id,
				user.name,
				user.email,
			])
			return user
		} catch {
			return null
		}
	}

	update(user: User): User | null {
		const result = this.db.run(`UPDATE ${this.table_name} SET name = ?, email = ? WHERE id = ?`, [
			user.name,
			user.email,
			user.id,
		])
		return result.changes > 0 ? user : null
	}

	delete(id: string): User | null {
		const user = this.getById(id)
		if (!user) return null

		this.db.run(`DELETE FROM ${this.table_name} WHERE id = ?`, [id])
		return user
	}

	getById(id: string): User | null {
		return this.db.query(`SELECT id, name, email FROM ${this.table_name} WHERE id = $id`).as(User).get({ $id: id })
	}

	getAll(): User[] {
		return this.db.query(`SELECT id, name, email FROM ${this.table_name}`).as(User).all()
	}
}
