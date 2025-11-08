import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\MovieController::index
* @see app/Http/Controllers/MovieController.php:23
* @route '/api/movies'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/movies',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MovieController::index
* @see app/Http/Controllers/MovieController.php:23
* @route '/api/movies'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MovieController::index
* @see app/Http/Controllers/MovieController.php:23
* @route '/api/movies'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MovieController::index
* @see app/Http/Controllers/MovieController.php:23
* @route '/api/movies'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MovieController::show
* @see app/Http/Controllers/MovieController.php:55
* @route '/api/movies/{movie}'
*/
export const show = (args: { movie: string | number } | [movie: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/movies/{movie}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MovieController::show
* @see app/Http/Controllers/MovieController.php:55
* @route '/api/movies/{movie}'
*/
show.url = (args: { movie: string | number } | [movie: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { movie: args }
    }

    if (Array.isArray(args)) {
        args = {
            movie: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        movie: args.movie,
    }

    return show.definition.url
            .replace('{movie}', parsedArgs.movie.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MovieController::show
* @see app/Http/Controllers/MovieController.php:55
* @route '/api/movies/{movie}'
*/
show.get = (args: { movie: string | number } | [movie: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MovieController::show
* @see app/Http/Controllers/MovieController.php:55
* @route '/api/movies/{movie}'
*/
show.head = (args: { movie: string | number } | [movie: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MovieController::update
* @see app/Http/Controllers/MovieController.php:32
* @route '/api/movies/{movie}'
*/
export const update = (args: { movie: string | number } | [movie: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/movies/{movie}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\MovieController::update
* @see app/Http/Controllers/MovieController.php:32
* @route '/api/movies/{movie}'
*/
update.url = (args: { movie: string | number } | [movie: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { movie: args }
    }

    if (Array.isArray(args)) {
        args = {
            movie: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        movie: args.movie,
    }

    return update.definition.url
            .replace('{movie}', parsedArgs.movie.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MovieController::update
* @see app/Http/Controllers/MovieController.php:32
* @route '/api/movies/{movie}'
*/
update.put = (args: { movie: string | number } | [movie: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\MovieController::update
* @see app/Http/Controllers/MovieController.php:32
* @route '/api/movies/{movie}'
*/
update.patch = (args: { movie: string | number } | [movie: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

const movies = {
    index: Object.assign(index, index),
    show: Object.assign(show, show),
    update: Object.assign(update, update),
}

export default movies