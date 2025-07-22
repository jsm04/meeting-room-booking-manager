export class Time {
	static checkTimeFormat(time: string): boolean {
		return /^([01]\d|2[0-3]):([0-5]\d)$/.test(time)
	}

	static toTimeString(hour: number, minute: number): string {
		const pad = (n: number) => n.toString().padStart(2, '0')
		return `${pad(hour)}:${pad(minute)}`
	}
}
