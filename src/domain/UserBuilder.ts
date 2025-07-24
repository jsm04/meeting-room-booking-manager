import { UserProps } from '../model/User'

export class UserBuilder {
	private user: Partial<UserProps> = {}
	static email_regex = /^\S+@\S+\.\S+$/

	setName(name: string): this {
		if (!name.trim()) throw new Error('Name cannot be empty')
		this.user.name = name
		return this
	}

	setEmail(email: string): this {
		if (!UserBuilder.email_regex.test(email)) {
			throw new Error('Invalid email format')
		}
		this.user.email = email
		return this
	}

	build(): UserProps {
		if (!this.user.name) throw new Error('Name is required')
		if (!this.user.email) throw new Error('Email is required')
		return this.user as UserProps
	}
}
