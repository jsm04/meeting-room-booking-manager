import { MockUtils } from './domain/MockUtils'
import { DatabaseAccess } from './repository/DatabaseSingleton'
import { OfficeRepository } from './repository/OfficeRepository'
import { UserRepository } from './repository/UserRepository'

export const userRepository = new UserRepository()
export const officeRepository = new OfficeRepository()

MockUtils.seed(DatabaseAccess.getInstance())
