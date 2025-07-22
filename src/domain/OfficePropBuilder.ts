import { week_days, WeekDay } from './const'
import { OfficePropertiesType } from '../model/Office'
import { Time } from './Time'

export class OfficePropertiesBuilder {
	private properties: Partial<OfficePropertiesType> = {}
	private validDays = week_days

	setName(name: string): this {
		if (!name.trim()) throw new Error('Name cannot be empty')
		this.properties.name = name
		return this
	}

	setSize(sizeInSquaredMeters: number): this {
		if (sizeInSquaredMeters <= 0) throw new Error('Size must be positive')
		this.properties.size = sizeInSquaredMeters
		return this
	}

	setDaysAvailable(days: WeekDay[]): this {
		if (!days.length) throw new Error('DaysAvailable cannot be empty')
		for (const day of days) {
			if (!this.validDays.includes(day)) throw new Error(`Invalid day: ${day}`)
		}
		this.properties.daysAvailable = days
		return this
	}

	setOpeningHour(hour: string): this {
		if (!Time.checkTimeFormat(hour)) throw new Error('Invalid opening hour format')
		this.properties.openingHour = hour
		return this
	}

	setClosingHour(hour: string): this {
		if (!Time.checkTimeFormat(hour)) throw new Error('Invalid closing hour format')
		if (this.properties.openingHour && hour <= this.properties.openingHour)
			throw new Error('Closing hour must be after opening hour')
		this.properties.closingHour = hour
		return this
	}

	build(): OfficePropertiesType {
		if (
			!this.properties.name ||
			this.properties.size === undefined ||
			!this.properties.daysAvailable ||
			!this.properties.openingHour ||
			!this.properties.closingHour
		) {
			throw new Error('Missing fields to build OfficeSettings')
		}
		return this.properties as OfficePropertiesType
	}
}
