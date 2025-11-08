import DashboardController from './DashboardController'
import UserController from './UserController'
import MovieController from './MovieController'
import TvController from './TvController'

const Admin = {
    DashboardController: Object.assign(DashboardController, DashboardController),
    UserController: Object.assign(UserController, UserController),
    MovieController: Object.assign(MovieController, MovieController),
    TvController: Object.assign(TvController, TvController),
}

export default Admin