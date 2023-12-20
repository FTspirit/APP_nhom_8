import { createRequest } from './api'
import { API_URL, timeout } from './api-config'

const coreApi = createRequest(API_URL, timeout)
export default coreApi
