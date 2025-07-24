import { User } from '../model/User'
import { UserRepository } from '../repository/UserRepository'

export class UserService {
	constructor(private readonly userRepository: UserRepository) {}
}
