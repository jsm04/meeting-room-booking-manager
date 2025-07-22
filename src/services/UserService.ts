import { User } from '../model/User'
import { UserRepository } from '../repository/UserRepository'
import { BaseCRUDService } from './CrudServiceBase'

export class UserService extends BaseCRUDService<User> {
	constructor(private readonly repository: UserRepository) {
		super()
	}

	get(id: string): User | null {
		const result = this.repository.getById(id)
		return result
	}

	create(resource: Required<User>): User {
		const result = this.repository.add(resource)
		// TODO: missing failure logic
		return resource
	}

	read(): User[] {
		const result = this.repository.getAll()
		return result
	}

	update(id: string, resource: Partial<User>): User | null {
		const search = this.repository.getById(id)
		if (!search) return null

		const updatedUser = { ...search, ...resource }
		this.repository.update(updatedUser)
		return resource as User
	}

	delete(id: string): User | null {
		this.repository.delete(id)
		// TODO: missing logic
		return null
	}
}
