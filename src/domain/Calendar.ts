export class Calendar {
	static toTimestamp(date: string, hour: number, minute: number): number {
		const [year, month, day] = date.split('-').map(Number)
		const dt = new Date(year, month - 1, day, hour, minute)
		return dt.getTime()
	}
}
