export abstract class BaseCRUDService<T> {
	constructor() {}

	abstract get(id: string): T | null;
	abstract create(resource: T): T;
	abstract read(): T[];
	abstract update(id: string, resource: Partial<T>): T | null;
	abstract delete(id: string): T | null;
}
