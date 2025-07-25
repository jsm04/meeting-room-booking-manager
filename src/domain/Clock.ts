import { EventEmitter } from 'events'
import { TimeUtils } from './Time'

type ClockState = {
	hour: number
	minute: number
	second: number
}

export class Clock extends EventEmitter {
	private hour: number
	private minute: number
	private second: number
	private timerId?: ReturnType<typeof setInterval>

	constructor({ hour = 0, minute = 0, second = 0 }: ClockState, autoStart: boolean = false) {
		super()

		this.hour = hour % 24
		this.minute = minute % 60
		this.second = second % 60

		if (autoStart) this.start()
	}

	tick(): void {
		this.second += 1
		if (this.second === 60) {
			this.second = 0
			this.minute += 1
		}
		if (this.minute === 60) {
			this.minute = 0
			this.hour += 1
		}
		if (this.hour === 24) {
			this.hour = 0
		}

		this.emit('tick', this.getState())
	}

	start(intervalMs: number = 1000): void {
		if (this.timerId) return
		this.timerId = setInterval(() => this.tick(), intervalMs)
	}

	stop(): void {
		if (this.timerId) {
			clearInterval(this.timerId)
			this.timerId = undefined
		}
	}

	update({ hour = 0, minute = 0, second = 0 }: ClockState) {
		this.hour = hour % 24
		this.minute = minute % 60
		this.second = second % 60
		return this
	}

	getState(): string {
		const pad = (n: number) => n.toString().padStart(2, '0')
		return `${pad(this.hour)}:${pad(this.minute)}:${pad(this.second)}`
	}

	toTimeString(): string {
		return TimeUtils.toTimeString(this.hour, this.minute)
	}

	toDate(): Date {
		const now = new Date()
		return new Date(now.getFullYear(), now.getMonth(), now.getDate(), this.hour, this.minute, this.second)
	}

	compare(other: Clock): number {
		const totalThis = this.hour * 3600 + this.minute * 60 + this.second
		const totalOther = other.hour * 3600 + other.minute * 60 + other.second

		return Math.sign(totalThis - totalOther)
	}

	static newClockState(hour: number, minute: number, second: number): ClockState {
		if (second === 60) {
			second = 0
			minute += 1
		}
		if (minute === 60) {
			minute = 0
			hour += 1
		}
		if (hour === 24) {
			hour = 0
		}

		return {
			hour,
			minute,
			second,
		}
	}

	static toTimeString(hour: number, minute: number): string {
		return TimeUtils.toTimeString(hour, minute)
	}
}
