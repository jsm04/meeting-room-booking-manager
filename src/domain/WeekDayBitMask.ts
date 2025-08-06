import { week_days, WeekDay } from './const'

export class WeekDayBitMask {
	private static weekDays = week_days

	static encodeDays(days: WeekDay[]): number {
		return days.reduce((mask, day) => {
			const idx = this.weekDays.indexOf(day)
			return idx >= 0 ? mask | (1 << idx) : mask
		}, 0)
	}

	static decodeDays(mask: number): string[] {
		return this.weekDays.filter((_, idx) => (mask & (1 << idx)) !== 0)
	}
}
