import { Response } from 'express'
import { TApiResponse } from '../@types/common'

const sendResponse = <T>(res: Response, data: TApiResponse<T>): void => {
  const responseData: TApiResponse<T> = {
    statusCode: data.statusCode,
    success: true,
    message: data.message,
    data: data.data || null || undefined,
    meta: data.meta || null || undefined,
  }
  res.status(data.statusCode).json(responseData)
}

export default sendResponse
