import { randomUUIDv7 } from 'bun'

export abstract class BaseModel<T> {
	protected genUUID(id?: string | undefined) {
		return id ?? randomUUIDv7('base64url')
	}

	dateOnly(date: Date): string {
		return date.toISOString().split('T')[0]
	}
}
