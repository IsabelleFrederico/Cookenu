export class ApiError extends Error {
  constructor(public code: number, public message: string) { super(message) }

  static wrongParams(message: string) {
    throw new ApiError(406, message)
  }

  static badRequest(message: string) {
    throw new ApiError(400, message)
  }

  static notFound(message: string) {
    throw new ApiError(404, 'Cant found what you want!')
  }

  static internal() {
    throw new ApiError(500, 'Internal error')
  }
}