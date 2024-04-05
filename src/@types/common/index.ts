export interface iGenericResponse<T> {
  meta: {
    page: number
    limit: number
    total: number
  }
  data: T
}

export interface iGenericErrorMessage {
  path: string | number
  message: string
}

export interface iGenericErrorResponse {
  statusCode: number
  message: string
  errorMessages: iGenericErrorMessage[]
}

export type TApiResponse<T> = {
  statusCode: number
  success: boolean
  message: string
  meta?: {
    page: number
    limit: number
    total: number
  }
  data?: T | null
}
