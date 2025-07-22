import { randomUUIDv7 } from 'bun'
import { WeekDay } from '../domain/const'
import { Time } from '../domain/Time'
import { WeekDayBitMask } from '../domain/utils'

export type OfficePropertiesType = {
	id?: string
	name: string
	size: number
	daysAvailable: WeekDay[]
	openingHour: string
	closingHour: string
}

export class Office {
	id: string
	name: string
	size: number
	daysAvailable: number
	openingHour: string
	closingHour: string

	constructor({ id, name, size, daysAvailable, openingHour, closingHour }: OfficePropertiesType) {
		this.id = id ?? randomUUIDv7('base64url')
		this.name = name
		this.size = size
		this.daysAvailable = WeekDayBitMask.encodeDays(daysAvailable)
		this.openingHour = openingHour
		this.closingHour = closingHour
	}

	isOpen(day: WeekDay, hour: string): boolean {
		if (!Time.checkTimeFormat(hour)) throw new Error('Invalid time format')
		return (
			WeekDayBitMask.decodeDays(this.daysAvailable).includes(day) &&
			hour >= this.openingHour &&
			hour <= this.closingHour
		)
	}

	get state() {
		const { id, name, size, openingHour, closingHour } = this
		const daysAvailable = WeekDayBitMask.decodeDays(this.daysAvailable)
		return { id, name, size, openingHour, closingHour, daysAvailable }
	}
}
