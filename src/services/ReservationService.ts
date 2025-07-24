import { TimeUtils } from '../domain/Time'
import { Office } from '../model/Office'
import { Reservation } from '../model/Reservation'
import { OfficeRepository } from '../repository/OfficeRepository'
import { ReservationRepository } from '../repository/ReservationRepository'
import { UserRepository } from '../repository/UserRepository'

export class ReservationService {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly officeRepository: OfficeRepository,
		private readonly reservationRepository: ReservationRepository,
	) {}

	scheduleOffice(userId: string, officeId: string, from: Date, to: Date) {
		if (!this.userRepository.exists(userId)) return
		if (!this.officeRepository.exists(officeId)) return

		const office = this.officeRepository.getById(officeId)!

		const isAvailable = this.isOfficeAvailable(officeId, from, to)

		if (!isAvailable) throw new Error('Office not available')

		const reservation = new Reservation({
			userId,
			officeId,
			startTime: from.toISOString(),
			endTime: to.toISOString(),
		})

		this.reservationRepository.create(reservation)

		return reservation
	}

	isOfficeAvailable(officeId: string, from: Date, to: Date): boolean {
		if (!this.officeRepository.exists(officeId)) throw new Error('Office not found')

		const office = this.officeRepository.getById(officeId)!

		const reservationDay = TimeUtils.getWeekDayFromDate(from)

		const turns = this.reservationRepository.find((reservation) => {
			return !(
				reservation.officeId === officeId &&
				office.isOpen(reservationDay, from) &&
				reservation.isWithinOfficeHours(new Date(office.openingHour), office.lastReservableTurn())
			)
		})

		return !turns.length
	}

	cancelScheduledOffice(userId: string, reservationId: string) {
		if (!this.userRepository.exists(userId)) throw new Error('User not found')

		const reservation = this.reservationRepository.getById(reservationId)

		if (!reservation) throw new Error('Reservation not found')
		if (reservation.userId !== userId) throw new Error('Reservation not registered to user')

		return this.reservationRepository.delete(reservationId)
	}
}
