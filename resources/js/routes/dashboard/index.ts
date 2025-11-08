import users from './users'
import movies from './movies'
import tv from './tv'

const dashboard = {
    users: Object.assign(users, users),
    movies: Object.assign(movies, movies),
    tv: Object.assign(tv, tv),
}

export default dashboard