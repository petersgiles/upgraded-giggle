// Import only what we need from express
import { Router, Request, Response } from 'express'

// Assign router to the express.Router() instance
const router: Router = Router()

router.get('/', (req: Request, res: Response) => {
	return res.send('Received a GET HTTP method')
})

router.post('/', (req: Request, res: Response) => {
	return res.send('Received a POST HTTP method')
})

router.put('/', (req: Request, res: Response) => {
	return res.send('Received a PUT HTTP method')
})

router.delete('/', (req: Request, res: Response) => {
	return res.send('Received a DELETE HTTP method')
})

// Export the express.Router() instance to be used by server.ts
export const BriefApiController: Router = router
