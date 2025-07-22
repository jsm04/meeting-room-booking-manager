export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'HEAD'

export type Handler = (req: Request) => Promise<Response>

export type MethodMap = Partial<Record<HTTPMethod, Handler>>

export type RouteObject = {
	[key: string]: MethodMap | RouteObject
}
