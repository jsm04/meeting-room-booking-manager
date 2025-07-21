import { UserType } from '../model/User';

export class UserBuilder {
	private user: Partial<UserType> = {};

	setName(name: string): this {
		if (!name.trim()) throw new Error('Name cannot be empty');
		this.user.name = name;
		return this;
	}

	setEmail(email: string): this {
		if (!/^\S+@\S+\.\S+$/.test(email)) {
			throw new Error('Invalid email format');
		}
		this.user.email = email;
		return this;
	}

	build(): UserType {
		if (!this.user.name) throw new Error('Name is required');
		if (!this.user.email) throw new Error('Email is required');
		return this.user as UserType;
	}
}
