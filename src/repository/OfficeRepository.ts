import { Database } from 'bun:sqlite'
import { DB } from './DbSingleton'
import { BaseRepository } from './BaseRepository'

export type Office = {
	id: string
	name: string
	size: number
	daysAvailable: string[]
	openingHour: string
	closingHour: string
}

export class OfficeRepository extends BaseRepository {
	constructor(table_name: string) {
		super(table_name)
	}

	protected createTable() {
		this.db.run(`
      CREATE TABLE IF NOT EXISTS offices (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        size INTEGER NOT NULL,
        daysAvailable TEXT NOT NULL,
        openingHour TEXT NOT NULL,
        closingHour TEXT NOT NULL
      )
    `)
	}

	add(office: Office): void {
		this.db.run(
			`INSERT INTO offices (id, name, size, daysAvailable, openingHour, closingHour) VALUES (?, ?, ?, ?, ?, ?)`,
			[
				office.id,
				office.name,
				office.size,
				JSON.stringify(office.daysAvailable),
				office.openingHour,
				office.closingHour,
			],
		)
	}

	getById(id: string): Office | null {
		const result = this.db.query(`SELECT * FROM offices WHERE id = ?`).get(id) as
			| [string, string, number, string, string, string]
			| undefined

		if (!result) return null

		return {
			id: result[0],
			name: result[1],
			size: result[2],
			daysAvailable: JSON.parse(result[3]),
			openingHour: result[4],
			closingHour: result[5],
		}
	}

	getAll(): Office[] {
		const rows = this.db.query(`SELECT * FROM offices`).all() as
			| [string, string, number, string, string, string][]
			| undefined

		if (!rows) return []

		return rows.map((row) => ({
			id: row[0],
			name: row[1],
			size: row[2],
			daysAvailable: JSON.parse(row[3]),
			openingHour: row[4],
			closingHour: row[5],
		}))
	}

	update(office: Office): void {
		this.db.run(
			`UPDATE offices SET name = ?, size = ?, daysAvailable = ?, openingHour = ?, closingHour = ? WHERE id = ?`,
			[
				office.name,
				office.size,
				JSON.stringify(office.daysAvailable),
				office.openingHour,
				office.closingHour,
				office.id,
			],
		)
	}

	delete(id: string): void {
		this.db.run(`DELETE FROM offices WHERE id = ?`, [id])
	}
}
