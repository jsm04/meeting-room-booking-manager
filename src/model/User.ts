import { randomUUIDv7 } from 'bun'

export type UserType = {
	id?: string
	name: string
	email: string
}

export class User implements UserType {
	id: string
	name: string
	email: string

	constructor({ id, email, name }: UserType) {
		this.id = id ?? randomUUIDv7('base64url')
		this.name = name
		this.email = email
	}
}
