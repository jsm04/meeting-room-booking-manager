import { week_days } from './const'

export class TimeUtils {
	static isSameDay(d1: Date, d2: Date): boolean {
		return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate()
	}

	static isSameHour(d1: Date, d2: Date): boolean {
		return this.isSameDay(d1, d2) && d1.getHours() === d2.getHours()
	}

	static isBookedOn(resStart: Date, resEnd: Date, target: Date): boolean {
		return target >= resStart && target < resEnd
	}

	static addMinutesToISOString(iso: string, minutes: number): string {
		const date = new Date(iso)
		date.setMinutes(date.getMinutes() + minutes)
		return date.toISOString()
	}

	static overlaps(resAStart: Date, resAEnd: Date, resBStart: Date, resBEnd: Date): boolean {
		return resAStart < resBEnd && resAEnd > resBStart
	}

	static durationInMinutes(start: Date, end: Date): number {
		return (end.getTime() - start.getTime()) / 60000
	}

	static checkTimeFormat(time: string): boolean {
		return /^([01]\d|2[0-3]):([0-5]\d)$/.test(time)
	}

	static toTimeString(hour: number, minute: number): string {
		const pad = (n: number) => n.toString().padStart(2, '0')
		return `${pad(hour)}:${pad(minute)}`
	}

	static fromMinutesToTimestring(total: number): string {
		const h = Math.floor(total / 60)
		const m = total % 60
		return this.toTimeString(h, m)
	}

	static fromTimestringToMinutes(time: string): number {
		if (!this.checkTimeFormat(time)) throw new Error('Invalid time format')
		const [h, m] = time.split(':').map(Number)
		return h * 60 + m
	}

	static getWeekDayFromDate(date: Date): (typeof week_days)[number] {
		// JavaScript: 0 = Sunday, 6 = Saturday
		const index = (date.getDay() + 6) % 7 // Shift so Monday = 0
		return week_days[index]
	}
}
