import { Office } from '../model/Office'
import { User } from '../model/User'
import { OfficePropertiesBuilder } from './OfficePropBuilder'
import { faker as Random } from '@faker-js/faker'
import { Time } from './Time'
import { week_days } from './const'

export class MockUtils {
	static default_user = new User({ email: 'jhondoe@email.com', name: 'joe doe' })

	static default_office = new Office(
		new OfficePropertiesBuilder()
			.setName('MockOffice')
			.setSize(22)
			.setDaysAvailable(['Monday', 'Thursday', 'Wednesday'])
			.setOpeningHour('08:00')
			.setClosingHour('20:30')
			.build(),
	)

	static newUser() {
		return new User({ email: Random.internet.email(), name: Random.person.fullName() })
	}

	static newOffice() {
		const { int } = Random.number

		const name = Random.commerce.productName(),
			size = int({ min: 16, max: 200 }),
			openingHour = Time.toTimeString(int({ min: 6, max: 10 }), int({ min: 1, max: 59 })),
			closingHour = Time.toTimeString(int({ min: 15, max: 23 }), int({ min: 1, max: 59 })),
			daysAvailable = this.pickRandoms([...week_days])

		return new Office({ name, size, openingHour, closingHour, daysAvailable })
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
}
