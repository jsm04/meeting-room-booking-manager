import { Reservation } from '../model/Reservation'
import { BaseRepository } from './BaseRepository'

export class ReservationRepository extends BaseRepository<Reservation> {
	table_name = 'reservations'

	constructor() {
		super()
		this.createTable()
	}

	protected createTable() {
		this.db.run(`
		CREATE TABLE IF NOT EXISTS ${this.table_name} (
			id TEXT PRIMARY KEY,
			userId TEXT NOT NULL,
			officeId TEXT NOT NULL,
			startTime TEXT NOT NULL,
			endTime TEXT NOT NULL,
			FOREIGN KEY (userId) REFERENCES users(id),
			FOREIGN KEY (officeId) REFERENCES office(id)
		)`)
	}

	create(reservation: Reservation): Reservation | null {
		try {
			this.db.run(
				`INSERT INTO ${this.table_name} 
				(id, userId, officeId, startTime, endTime)
				VALUES (?, ?, ?, ?, ?)`,
				[reservation.id, reservation.userId, reservation.officeId, reservation.startTime, reservation.endTime],
			)
			return reservation
		} catch (error) {
			console.log(error)
			return null
		}
	}

	update(reservation: Reservation): Reservation | null {
		const result = this.db.run(
			`UPDATE ${this.table_name} SET userId = ?, officeId = ?, startTime = ?, endTime = ? WHERE id = ?`,
			[reservation.userId, reservation.officeId, reservation.startTime, reservation.endTime, reservation.id],
		)
		return result.changes > 0 ? reservation : null
	}

	delete(id: string): Reservation | null {
		const reservation = this.getById(id)
		if (!reservation) return null

		this.db.run(`DELETE FROM ${this.table_name} WHERE id = ?`, [id])
		return reservation
	}

	getById(id: string): Reservation | null {
		return this.db.query(`SELECT * FROM ${this.table_name} WHERE id = $id`).as(Reservation).get({ $id: id })
	}

	getAll(): Reservation[] {
		return this.db.query(`SELECT * FROM ${this.table_name}`).as(Reservation).all()
	}
}
