import { Database } from 'bun:sqlite'
import { DatabaseAccess } from './DatabaseSingleton'
import { BaseRepository } from './BaseRepository'
import { Office } from '../model/Office'

export class OfficeRepository extends BaseRepository<Office> {
	table_name = 'offices'

	constructor() {
		super()
		this.createTable()
	}

	protected createTable() {
		this.db.run(`
		CREATE TABLE IF NOT EXISTS ${this.table_name} (
			id TEXT PRIMARY KEY,
			name TEXT NOT NULL,
			size INTEGER NOT NULL,
			daysAvailable INTEGER NOT NULL,
			openingHour TEXT NOT NULL,
			closingHour TEXT NOT NULL
		)`)
	}

	create(office: Office): Office | null {
		try {
			this.db.run(
				`INSERT INTO ${this.table_name} (id, name, size, daysAvailable, openingHour, closingHour) VALUES (?, ?, ?, ?, ?, ?)`,
				[office.id, office.name, office.size, office.daysAvailable, office.openingHour, office.closingHour],
			)
			return office
		} catch {
			return null
		}
	}

	update(office: Office): Office | null {
		const result = this.db.run(
			`UPDATE ${this.table_name} SET name = ?, size = ?, daysAvailable = ?, openingHour = ?, closingHour = ? WHERE id = ?`,
			[
				office.name,
				office.size,
				office.daysAvailable,
				office.openingHour,
				office.closingHour,
				office.id,
			],
		)
		return result.changes > 0 ? office : null
	}

	delete(id: string): Office | null {
		const office = this.getById(id)
		if (!office) return null

		this.db.run(`DELETE FROM ${this.table_name} WHERE id = ?`, [id])
		return office
	}

	getById(id: string): Office | null {
		return this.db.query(`SELECT * FROM ${this.table_name} WHERE id = $id`).as(Office).get({ $id: id })
	}

	getAll(): Office[] {
		return this.db.query(`SELECT * FROM ${this.table_name}`).as(Office).all()
	}
}
