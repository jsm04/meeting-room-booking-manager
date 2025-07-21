import { randomUUIDv7 } from 'bun';

export type OfficePropertiesType = {
	id?: string;
	name: string;
	size: number;
	daysAvailable: string[];
	openingHour: string;
	closingHour: string;
};

export class Office implements OfficePropertiesType {
	public id: string;
	public name: string;
	public size: number;
	public daysAvailable: string[];
	public openingHour: string;
	public closingHour: string;

	constructor({
		id,
		name,
		size,
		daysAvailable,
		openingHour,
		closingHour,
	}: OfficePropertiesType) {
		!id ? (this.id = randomUUIDv7('base64url')) : (this.id = id);
		this.name = name;
		this.size = size;
		this.daysAvailable = daysAvailable;
		this.openingHour = openingHour;
		this.closingHour = closingHour;
	}

	isOpen(day: string, hour: string): boolean {
		return (
			this.daysAvailable.includes(day) &&
			hour >= this.openingHour &&
			hour <= this.closingHour
		);
	}
}
