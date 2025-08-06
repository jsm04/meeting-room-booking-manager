import { BaseModel } from './BaseModel'

export type ReservationProps = {
	userId: string
	officeId: string
	startTime: string
	endTime: string
}

export class Reservation extends BaseModel<Reservation> {
	id: string
	userId: string
	officeId: string
	startTime: string
	endTime: string

	constructor({ userId, officeId, startTime, endTime }: ReservationProps) {
		super()
		this.id = this.genUUID()
		this.userId = userId
		this.officeId = officeId
		this.startTime = startTime
		this.endTime = endTime
	}

	isOverlapping(other: Reservation): boolean {
		return true
	}

	isWithinOfficeHours(open: string, close: string): boolean {
		const [startTime, endTime] = this.toISOString()
		return startTime >= open && endTime <= close
	}

	duration(): number {
		const [startTime, endTime] = this.toDate()
		return (endTime.getTime() - startTime.getTime()) / 60000
	}

	isOnSameDay(date: Date): boolean {
		const [startTime] = this.toDate()
		return (
			startTime.getFullYear() === date.getFullYear() &&
			startTime.getMonth() === date.getMonth() &&
			startTime.getDate() === date.getDate()
		)
	}

	toISOString() {
		return this.toDate().map((d) => d.toISOString())
	}

	toDate() {
		return [new Date(this.startTime), new Date(this.endTime)]
	}
}
