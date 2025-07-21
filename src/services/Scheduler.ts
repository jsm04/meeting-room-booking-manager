export type EventScheduleType = {
	date: Date;
	title: string;
	description?: string;
};

export class Scheduler {
	private events: EventScheduleType[] = [];

	addEvent(date: Date, title: string, description?: string): void {
		this.events.push({ date, title, description });
	}

	removeEvent(date: Date, title: string): boolean {
		const index = this.events.findIndex(
			(e) => e.date.getTime() === date.getTime() && e.title === title
		);
		if (index >= 0) {
			this.events.splice(index, 1);
			return true;
		}
		return false;
	}

	getEventsOnDate(date: Date): EventScheduleType[] {
		return this.events.filter(
			(e) => e.date.toDateString() === date.toDateString()
		);
	}

	getAllEvents(): EventScheduleType[] {
		return [...this.events];
	}
}
