import { randomUUIDv7 } from 'bun'
import { WeekDay } from '../domain/const'
import { Time } from '../domain/Time'

export type OfficePropertiesType = {
	id?: string
	name: string
	size: number
	daysAvailable: string[]
	openingHour: string
	closingHour: string
}

export class Office {
	private id: string
	private name: string
	private size: number
	private daysAvailable: string[]
	private openingHour: string
	private closingHour: string

	constructor({ id, name, size, daysAvailable, openingHour, closingHour }: OfficePropertiesType) {
		!id ? (this.id = randomUUIDv7('base64url')) : (this.id = id)
		this.name = name
		this.size = size
		this.daysAvailable = daysAvailable
		this.openingHour = openingHour
		this.closingHour = closingHour
	}

	isOpen(day: WeekDay, hour: string): boolean {
		if (!Time.checkTimeFormat(hour)) throw new Error('Invalid time format')
		return this.daysAvailable.includes(day) && hour >= this.openingHour && hour <= this.closingHour
	}
}
