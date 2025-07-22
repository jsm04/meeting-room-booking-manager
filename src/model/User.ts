import { randomUUIDv7 } from 'bun'

export type UserType = {
	id?: string
	name: string
	email: string
}

export class User {
	private id?: string
	private name: string
	private email: string

	constructor({ id, email, name }: UserType) {
		!id ? (this.id = randomUUIDv7('base64url')) : (this.id = id)
		this.name = name
		this.email = email
	}
}
