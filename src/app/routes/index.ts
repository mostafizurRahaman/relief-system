
import express from 'express'; 
import { userRoutes } from '../modules/User/User.Route';


const router = express.Router()


const routes = [
  {
    path: '/users', 
    route: userRoutes
  }
]


routes.forEach(route => router.use(route.path, route.route))

export const allRoutes = router; 