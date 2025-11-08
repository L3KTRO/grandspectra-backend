import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\RatingController::index
* @see app/Http/Controllers/RatingController.php:0
* @route '/api/me/ratings'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/me/ratings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RatingController::index
* @see app/Http/Controllers/RatingController.php:0
* @route '/api/me/ratings'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RatingController::index
* @see app/Http/Controllers/RatingController.php:0
* @route '/api/me/ratings'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RatingController::index
* @see app/Http/Controllers/RatingController.php:0
* @route '/api/me/ratings'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RatingController::store
* @see app/Http/Controllers/RatingController.php:16
* @route '/api/me/ratings'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/me/ratings',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RatingController::store
* @see app/Http/Controllers/RatingController.php:16
* @route '/api/me/ratings'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RatingController::store
* @see app/Http/Controllers/RatingController.php:16
* @route '/api/me/ratings'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RatingController::show
* @see app/Http/Controllers/RatingController.php:0
* @route '/api/me/ratings/{rating}'
*/
export const show = (args: { rating: string | number } | [rating: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/me/ratings/{rating}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RatingController::show
* @see app/Http/Controllers/RatingController.php:0
* @route '/api/me/ratings/{rating}'
*/
show.url = (args: { rating: string | number } | [rating: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rating: args }
    }

    if (Array.isArray(args)) {
        args = {
            rating: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        rating: args.rating,
    }

    return show.definition.url
            .replace('{rating}', parsedArgs.rating.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RatingController::show
* @see app/Http/Controllers/RatingController.php:0
* @route '/api/me/ratings/{rating}'
*/
show.get = (args: { rating: string | number } | [rating: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RatingController::show
* @see app/Http/Controllers/RatingController.php:0
* @route '/api/me/ratings/{rating}'
*/
show.head = (args: { rating: string | number } | [rating: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RatingController::update
* @see app/Http/Controllers/RatingController.php:47
* @route '/api/me/ratings/{rating}'
*/
export const update = (args: { rating: number | { id: number } } | [rating: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/me/ratings/{rating}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\RatingController::update
* @see app/Http/Controllers/RatingController.php:47
* @route '/api/me/ratings/{rating}'
*/
update.url = (args: { rating: number | { id: number } } | [rating: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rating: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { rating: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            rating: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        rating: typeof args.rating === 'object'
        ? args.rating.id
        : args.rating,
    }

    return update.definition.url
            .replace('{rating}', parsedArgs.rating.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RatingController::update
* @see app/Http/Controllers/RatingController.php:47
* @route '/api/me/ratings/{rating}'
*/
update.put = (args: { rating: number | { id: number } } | [rating: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\RatingController::update
* @see app/Http/Controllers/RatingController.php:47
* @route '/api/me/ratings/{rating}'
*/
update.patch = (args: { rating: number | { id: number } } | [rating: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\RatingController::destroy
* @see app/Http/Controllers/RatingController.php:64
* @route '/api/me/ratings/{rating}'
*/
export const destroy = (args: { rating: number | { id: number } } | [rating: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/me/ratings/{rating}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\RatingController::destroy
* @see app/Http/Controllers/RatingController.php:64
* @route '/api/me/ratings/{rating}'
*/
destroy.url = (args: { rating: number | { id: number } } | [rating: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rating: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { rating: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            rating: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        rating: typeof args.rating === 'object'
        ? args.rating.id
        : args.rating,
    }

    return destroy.definition.url
            .replace('{rating}', parsedArgs.rating.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RatingController::destroy
* @see app/Http/Controllers/RatingController.php:64
* @route '/api/me/ratings/{rating}'
*/
destroy.delete = (args: { rating: number | { id: number } } | [rating: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const ratings = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default ratings