import * as z from 'zod'
export const createUserSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email address' }),
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, { message: 'Must be 5 or more characters long' })
      .max(16, { message: 'Must be 5 or fewer characters long' }),
  }),
})
