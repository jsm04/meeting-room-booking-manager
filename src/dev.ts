import { MockerUtils } from './domain/MockerUtils'

const { log, assert } = console

let tmp

tmp = MockerUtils.newOffice()
log(tmp)
tmp = MockerUtils.newUser()
log(tmp)
