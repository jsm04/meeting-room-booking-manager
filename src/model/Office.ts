import { randomUUIDv7 } from 'bun'
import { WeekDay } from '../domain/const'
import { TimeUtils } from '../domain/Time'
import { WeekDayBitMask } from '../domain/utils'
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

	constructor({ id, name, size, daysAvailable, openingHour, closingHour }: OfficePropsType) {
		super()
		this.id = this.genUUID(id)
		this.name = name
		this.size = size
		this.daysAvailable = WeekDayBitMask.encodeDays(daysAvailable)
		this.openingHour = openingHour
		this.closingHour = closingHour
	}

	isOpen(day: WeekDay, hour: Date): boolean {
		const [openingHour, closingHour] = this.toDate()
		return (
			WeekDayBitMask.decodeDays(this.daysAvailable).includes(day) &&
			hour >= openingHour &&
			hour <= this.lastReservableTurn()
		)
	}

	lastReservableTurn(thresholdInMinutes = 60): Date {
		const [_, closingHour] = this.toDate()
		const lastTurnMs = closingHour.getTime() - thresholdInMinutes * 60000
		return new Date(lastTurnMs)
	}

	private toDate() {
		return [new Date(this.openingHour), new Date(this.closingHour)]
	}
}
