import { week_days, WeekDay } from './const';
import { OfficePropertiesType } from '../model/Office';

export class OfficePropertiesBuilder {
	private settings: Partial<OfficePropertiesType> = {};
	private validDays = week_days;

	setName(name: string): this {
		if (!name.trim()) throw new Error('Name cannot be empty');
		this.settings.name = name;
		return this;
	}

	setSize(size: number): this {
		if (size <= 0) throw new Error('Size must be positive');
		this.settings.size = size;
		return this;
	}

	setDaysAvailable(days: WeekDay[]): this {
		if (!days.length) throw new Error('DaysAvailable cannot be empty');
		for (const day of days) {
			if (!this.validDays.includes(day)) throw new Error(`Invalid day: ${day}`);
		}
		this.settings.daysAvailable = days;
		return this;
	}

	private isValidTime(time: string): boolean {
		return /^([01]\d|2[0-3]):([0-5]\d)$/.test(time);
	}

	setOpeningHour(hour: string): this {
		if (!this.isValidTime(hour)) throw new Error('Invalid opening hour format');
		this.settings.openingHour = hour;
		return this;
	}

	setClosingHour(hour: string): this {
		if (!this.isValidTime(hour)) throw new Error('Invalid closing hour format');
		if (this.settings.openingHour && hour <= this.settings.openingHour)
			throw new Error('Closing hour must be after opening hour');
		this.settings.closingHour = hour;
		return this;
	}

	build(): OfficePropertiesType {
		if (
			!this.settings.name ||
			this.settings.size === undefined ||
			!this.settings.daysAvailable ||
			!this.settings.openingHour ||
			!this.settings.closingHour
		) {
			throw new Error('Missing fields to build OfficeSettings');
		}
		return this.settings as OfficePropertiesType;
	}
}
