import { randomUUIDv7 } from 'bun'
import { WeekDay } from '../domain/const'
import { WeekDayBitMask } from '../domain/WeekDayBitMask'
import { BaseModel } from './BaseModel'

export type OfficePropsType = {
	id?: string
	name: string
	size: number
	daysAvailable: WeekDay[]
	openingHour: string
	closingHour: string
}

export class Office extends BaseModel<Office> {
	id: string
	name: string
	size: number
	daysAvailable: number
	openingHour: string
	closingHour: string
	turnSpan?: number

	constructor({ id, name, size, daysAvailable, openingHour, closingHour }: OfficePropsType) {
		super()
		this.id = this.genUUID(id)
		this.name = name
		this.size = size
		this.daysAvailable = WeekDayBitMask.encodeDays(daysAvailable)
		this.openingHour = openingHour
		this.closingHour = closingHour
	}

	isAvailable(day: WeekDay, reservationHour: string | Date): boolean {
		const [openingHour, closingHour] = this.toISOString()

		reservationHour instanceof Date ? reservationHour : new Date(reservationHour)

		return (
			WeekDayBitMask.decodeDays(this.daysAvailable).includes(day) &&
			reservationHour <= this.lastReservableTurn() &&
			reservationHour >= openingHour
		)
	}

	lastReservableTurn() {
		if (!this.turnSpan) throw new Error('turn span not setted')
		const [_, close] = this.toDate()
		const lastTurn = new Date(close)
		lastTurn.setMinutes(lastTurn.getMinutes() - this.turnSpan)
		return lastTurn
	}

	setLastReservableTurnSpan(turnSpanInMinutes: number) {
		this.turnSpan = turnSpanInMinutes
	}

	toDate() {
		return [new Date(this.openingHour), new Date(this.closingHour)]
	}

	toISOString() {
		return this.toDate().map((d) => d.toISOString())
	}
}
