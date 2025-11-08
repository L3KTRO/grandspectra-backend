import MovieController from './MovieController'
import GenreController from './GenreController'
import PersonController from './PersonController'
import TvController from './TvController'
import UserController from './UserController'
import ContentListController from './ContentListController'
import SearchAllController from './SearchAllController'
import AuthController from './AuthController'
import RatingController from './RatingController'
import ReviewController from './ReviewController'
import WatchedController from './WatchedController'
import WatchlistController from './WatchlistController'
import FollowController from './FollowController'
import PersonFollowController from './PersonFollowController'
import NotificationController from './NotificationController'
import Admin from './Admin'
import ProfileController from './ProfileController'
import Auth from './Auth'

const Controllers = {
    MovieController: Object.assign(MovieController, MovieController),
    GenreController: Object.assign(GenreController, GenreController),
    PersonController: Object.assign(PersonController, PersonController),
    TvController: Object.assign(TvController, TvController),
    UserController: Object.assign(UserController, UserController),
    ContentListController: Object.assign(ContentListController, ContentListController),
    SearchAllController: Object.assign(SearchAllController, SearchAllController),
    AuthController: Object.assign(AuthController, AuthController),
    RatingController: Object.assign(RatingController, RatingController),
    ReviewController: Object.assign(ReviewController, ReviewController),
    WatchedController: Object.assign(WatchedController, WatchedController),
    WatchlistController: Object.assign(WatchlistController, WatchlistController),
    FollowController: Object.assign(FollowController, FollowController),
    PersonFollowController: Object.assign(PersonFollowController, PersonFollowController),
    NotificationController: Object.assign(NotificationController, NotificationController),
    Admin: Object.assign(Admin, Admin),
    ProfileController: Object.assign(ProfileController, ProfileController),
    Auth: Object.assign(Auth, Auth),
}

export default Controllers