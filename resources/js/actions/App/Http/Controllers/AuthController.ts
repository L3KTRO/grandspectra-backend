import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AuthController::register
* @see app/Http/Controllers/AuthController.php:24
* @route '/api/auth/register'
*/
export const register = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: register.url(options),
    method: 'post',
})

register.definition = {
    methods: ["post"],
    url: '/api/auth/register',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AuthController::register
* @see app/Http/Controllers/AuthController.php:24
* @route '/api/auth/register'
*/
register.url = (options?: RouteQueryOptions) => {
    return register.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AuthController::register
* @see app/Http/Controllers/AuthController.php:24
* @route '/api/auth/register'
*/
register.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: register.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AuthController::login
* @see app/Http/Controllers/AuthController.php:53
* @route '/api/auth/login'
*/
export const login = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: login.url(options),
    method: 'post',
})

login.definition = {
    methods: ["post"],
    url: '/api/auth/login',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AuthController::login
* @see app/Http/Controllers/AuthController.php:53
* @route '/api/auth/login'
*/
login.url = (options?: RouteQueryOptions) => {
    return login.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AuthController::login
* @see app/Http/Controllers/AuthController.php:53
* @route '/api/auth/login'
*/
login.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: login.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AuthController::update
* @see app/Http/Controllers/AuthController.php:89
* @route '/api/auth/edit'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/api/auth/edit',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AuthController::update
* @see app/Http/Controllers/AuthController.php:89
* @route '/api/auth/edit'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AuthController::update
* @see app/Http/Controllers/AuthController.php:89
* @route '/api/auth/edit'
*/
update.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AuthController::resendVerification
* @see app/Http/Controllers/AuthController.php:149
* @route '/api/auth/resend-verification'
*/
export const resendVerification = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resendVerification.url(options),
    method: 'post',
})

resendVerification.definition = {
    methods: ["post"],
    url: '/api/auth/resend-verification',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AuthController::resendVerification
* @see app/Http/Controllers/AuthController.php:149
* @route '/api/auth/resend-verification'
*/
resendVerification.url = (options?: RouteQueryOptions) => {
    return resendVerification.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AuthController::resendVerification
* @see app/Http/Controllers/AuthController.php:149
* @route '/api/auth/resend-verification'
*/
resendVerification.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resendVerification.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AuthController::logout
* @see app/Http/Controllers/AuthController.php:80
* @route '/api/logout'
*/
export const logout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

logout.definition = {
    methods: ["post"],
    url: '/api/logout',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AuthController::logout
* @see app/Http/Controllers/AuthController.php:80
* @route '/api/logout'
*/
logout.url = (options?: RouteQueryOptions) => {
    return logout.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AuthController::logout
* @see app/Http/Controllers/AuthController.php:80
* @route '/api/logout'
*/
logout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

const AuthController = { register, login, update, resendVerification, logout }

export default AuthController