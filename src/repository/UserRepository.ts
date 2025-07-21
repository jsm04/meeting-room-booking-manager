import SQLite, { Database } from 'bun:sqlite';
import { UserType } from '../model/User';
import { DB } from './DbSingleton';
import { BaseRepository } from './BaseRepository';

type UserWithID = Required<UserType>;

export class UserRepository extends BaseRepository {
	constructor(table_name: string) {
		super(table_name);
	}

	protected createTable() {
		this.db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE
      )
    `);
	}

	add(user: UserWithID) {
		return this.db.run(`INSERT INTO users (id, name, email) VALUES (?, ?, ?)`, [
			user.id,
			user.name,
			user.email,
		]);
	}

	getById(id: string): UserWithID | null {
		const result = this.db.query(`SELECT * FROM users WHERE id = ?`);
		const row = result.get(id) as [string, string, string] | undefined;
		if (!row) return null;
		return { id: row[0], name: row[1], email: row[2] };
	}

	update(user: UserWithID): void {
		this.db.run(`UPDATE users SET name = ?, email = ? WHERE id = ?`, [
			user.name,
			user.email,
			user.id,
		]);
	}

	delete(id: string): void {
		this.db.run(`DELETE FROM users WHERE id = ?`, [id]);
	}

	getAll(): UserWithID[] {
		const rows = this.db.query(`SELECT * FROM users`).all() as [
			string,
			string,
			string
		][];
		return rows.map((row) => ({ id: row[0], name: row[1], email: row[2] }));
	}
}
