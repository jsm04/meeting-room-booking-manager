import SQLite, { Database } from 'bun:sqlite';
import { UserType } from '../services/User';

type UserWithID = Required<UserType>;

export class UserRepository {
	private db: SQLite;

	constructor(db: Database) {
		this.db = db;
		this.createTable();
	}

	private createTable() {
		this.db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE
      )
    `);
	}

	add(user: UserWithID): void {
		this.db.run(
			`INSERT INTO users (id, name, email) VALUES (?, ?, ?)`,
			user.id,
			user.name,
			user.email
		);
	}

	getById(id: string): UserWithID | null {
		const result = this.db.query(`SELECT * FROM users WHERE id = ?`, id);
		const row = result.get();
		if (!row) return null;
		return { id: row[0], name: row[1], email: row[2] };
	}

	update(user: UserWithID): void {
		this.db.run(
			`UPDATE users SET name = ?, email = ? WHERE id = ?`,
			user.name,
			user.email,
			user.id
		);
	}

	delete(id: string): void {
		this.db.run(`DELETE FROM users WHERE id = ?`, id);
	}

	getAll(): UserWithID[] {
		const rows = this.db.query(`SELECT * FROM users`).all();
		return rows.map((row) => ({ id: row[0], name: row[1], email: row[2] }));
	}
}
