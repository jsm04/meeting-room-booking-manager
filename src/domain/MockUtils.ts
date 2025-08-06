import { Office } from '../model/Office'
import { Database } from 'bun:sqlite'
import { User } from '../model/User'
import { OfficePropertiesBuilder } from './OfficePropBuilder'
import { faker as Random } from '@faker-js/faker'
import { week_days } from './const'
import { officeRepository, reservationRepository, userRepository } from '../container'
import { AppManager } from './AppManager'
import { Reservation, ReservationProps } from '../model/Reservation'
import { ReservationRepository } from '../repository/ReservationRepository'

export class MockUtils {
	static default_user = new User({ email: 'jhondoe@email.com', name: 'joe doe' })

	static default_office = new Office(
		new OfficePropertiesBuilder()
			.setName('MockOffice')
			.setSize(22)
			.setDaysAvailable(['Monday', 'Thursday', 'Wednesday'])
			.setOpeningHour('2025-03-05T10:40:00.000Z')
			.setClosingHour('2025-03-05T20:40:00.000Z')
			.build(),
	)

	static newUser() {
		return new User({ email: Random.internet.email(), name: Random.person.fullName() })
	}

	static newOffice() {
		const { int } = Random.number

		const dateMock = () =>
			new Date(
				2025,
				int({ min: 0, max: 11 }),
				int({ min: 1, max: 31 }),
				int({ min: 6, max: 10 }),
				int({ min: 14, max: 59 }),
			).toISOString()

		const name = Random.commerce.productName(),
			size = int({ min: 16, max: 200 }),
			openingHour = dateMock(),
			closingHour = dateMock(),
			daysAvailable = this.pickRandoms([...week_days])

		return new Office({ name, size, openingHour, closingHour, daysAvailable })
	}

	static newReservation() {
		const user = this.pickRandoms(userRepository.getAll(), 1)[0]
		const office = this.pickRandoms(officeRepository.getAll(), 1)[0]

		const userId = user.id,
			officeId = office.id

		const { int } = Random.number
		const startTime = new Date(office.openingHour)
		startTime.setMinutes(startTime.getMinutes() + int({ min: 30, max: 180 }))
		const endTime = new Date(startTime)
		endTime.setMinutes(startTime.getMinutes() + 60)

		return new Reservation({
			userId,
			officeId,
			startTime: startTime.toISOString(),
			endTime: endTime.toISOString(),
		})
	}

	static addMockReservation() {
		reservationRepository.create(this.newReservation())
	}

	static pickRandoms<T>(arr: T[], count: number = 5): T[] {
		const shuffled = [...arr].sort(() => Math.random() - 0.5)
		return shuffled.slice(0, count)
	}

	static repeat<Callback extends Function>(count: number, fn: Callback) {
		for (let idx = 0; idx < count; idx++) {
			fn()
		}
	}

	static #isProd() {
		return process.env.NODE_ENV === 'production'
	}

	static seed(instance: Database, seedLimit = 50) {
		if (this.#isProd()) {
			return
		}

		if (officeRepository.count() < seedLimit)
			this.repeat(seedLimit - 1, () => officeRepository.create(this.newOffice()))

		if (userRepository.count() < seedLimit) this.repeat(seedLimit - 1, () => userRepository.create(this.newUser()))

		if (reservationRepository.count() < seedLimit) this.repeat(seedLimit, () => this.addMockReservation())
	}

	static clearDatabase() {
		if (this.#isProd()) {
			return
		}
		userRepository.clear()
		officeRepository.clear()
		reservationRepository.clear()
	}
}
