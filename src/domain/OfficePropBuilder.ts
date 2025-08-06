import { week_days, WeekDay } from './const'
import { OfficePropsType } from '../model/Office'

export class OfficePropertiesBuilder {
	private properties: Partial<OfficePropsType> = {}
	private weekDays = week_days

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
			if (!this.weekDays.includes(day)) throw new Error(`Invalid day: ${day}`)
		}
		this.properties.daysAvailable = days
		return this
	}

	setOpeningHour(d: Date | string): this {
		this.properties.openingHour = d instanceof Date ? d.toISOString() : d
		return this
	}

	setClosingHour(d: Date | string): this {
		const opening = this.properties.openingHour ? new Date(this.properties.openingHour) : null
		if (typeof d === 'string') d = new Date(d)
		if (opening && d.getTime() <= opening.getTime()) {
			throw new Error('Closing hour must be after opening hour')
		}
		this.properties.closingHour = d.toISOString()
		return this
	}

	build(): OfficePropsType {
		if (
			!this.properties.name ||
			this.properties.size === undefined ||
			!this.properties.daysAvailable ||
			!this.properties.openingHour ||
			!this.properties.closingHour
		) {
			throw new Error('Missing fields to build OfficeSettings')
		}
		return this.properties as OfficePropsType
	}
}
