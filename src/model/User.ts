import { randomUUIDv7 } from 'bun'

export type UserProps = {
	id?: string
	name: string
	email: string
}

export class User implements UserProps {
	id: string
	name: string
	email: string

	constructor({ id, email, name }: UserProps) {
		this.id = id ?? randomUUIDv7('base64url')
		this.name = name
		this.email = email
	}
}
