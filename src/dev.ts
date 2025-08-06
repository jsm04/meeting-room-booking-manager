import { officeRepository, reservationRepository, reservationService, userRepository } from './container'
import { MockUtils } from './domain/MockUtils'
import { TimeUtils } from './domain/TimeUtils'
import { Reservation } from './model/Reservation'
import { DatabaseAccess } from './repository/DatabaseSingleton'
import { OfficeRepository } from './repository/OfficeRepository'
import { ReservationRepository } from './repository/ReservationRepository'
import { UserRepository } from './repository/UserRepository'
import { UserService } from './services/UserService'

const { log, assert } = console
let tmp

const officeId = 'AZg-URRxcACJbMLa3LxLjw'
const office = officeRepository.getById(officeId)!
const reservationStart = TimeUtils.addMinutesToISOString(office.openingHour, 50)
const reservationEnd = TimeUtils.addMinutesToISOString(office.openingHour, 100)
tmp = reservationStart
log(tmp)

// tmp = reservationService.isOfficeAvailable(officeId, new Date(reservationStart), new Date(reservationEnd))


log(tmp)
