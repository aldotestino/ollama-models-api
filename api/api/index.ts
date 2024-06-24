import { createApi } from '../src/api'

const api = createApi()

export default async function handler(req: Request, reply: Response) {
  await api.ready()
  api.server.emit('request', req, reply)
}