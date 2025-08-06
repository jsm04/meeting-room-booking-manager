export class AppError extends Error {
	code: string
	data?: any
	trace: string[]

	constructor(message: string, code: string, data?: any) {
		super(message)
		this.name = this.constructor.name
		this.code = code
		this.data = data
		this.trace = [this.stack || '']
	}

	addTrace(traceInfo: string) {
		this.trace.push(traceInfo)
	}

	toJSON() {
		return {
			error: this.name,
			message: this.message,
			code: this.code,
			data: this.data,
			trace: this.trace,
		}
	}
}
