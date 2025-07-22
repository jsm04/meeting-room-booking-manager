import { MockUtils } from './domain/MockUtils'
import { OfficeRepository } from './repository/OfficeRepository'
import { UserRepository } from './repository/UserRepository'
import { UserService } from './services/UserService'

const { log, assert } = console

let temp

const userRepository = new UserRepository()
// const userService = new UserService(userRepository)
// MockerUtils.repeat(10, () => userRepository.add(MockerUtils.newUser()))
// const user = userRepository.find((u) => u.email === 'Madaline36@gmail.com')[0]
// userRepository.update(user)

const officeRepository = new OfficeRepository()
// MockUtils.repeat(10, () => officeRepository.create(MockUtils.newOffice()))

temp = officeRepository.getAll()[0]
log(temp.state)
