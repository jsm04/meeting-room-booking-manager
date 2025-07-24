import { MockUtils } from './domain/MockUtils'
import { DatabaseAccess } from './repository/DatabaseSingleton'
import { OfficeRepository } from './repository/OfficeRepository'
import { ReservationRepository } from './repository/ReservationRepository'
import { UserRepository } from './repository/UserRepository'
import { ReservationService } from './services/ReservationService'

export const userRepository = new UserRepository()
export const officeRepository = new OfficeRepository()
export const reservationRepository = new ReservationRepository()
export const reservationService = new ReservationService(userRepository, officeRepository, reservationRepository)

MockUtils.seed(DatabaseAccess.getInstance())
