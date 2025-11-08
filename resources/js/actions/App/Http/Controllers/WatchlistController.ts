import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\WatchlistController::index
* @see app/Http/Controllers/WatchlistController.php:15
* @route '/api/me/watchlist'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/me/watchlist',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\WatchlistController::index
* @see app/Http/Controllers/WatchlistController.php:15
* @route '/api/me/watchlist'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\WatchlistController::index
* @see app/Http/Controllers/WatchlistController.php:15
* @route '/api/me/watchlist'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\WatchlistController::index
* @see app/Http/Controllers/WatchlistController.php:15
* @route '/api/me/watchlist'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\WatchlistController::store
* @see app/Http/Controllers/WatchlistController.php:26
* @route '/api/me/watchlist'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/me/watchlist',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\WatchlistController::store
* @see app/Http/Controllers/WatchlistController.php:26
* @route '/api/me/watchlist'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\WatchlistController::store
* @see app/Http/Controllers/WatchlistController.php:26
* @route '/api/me/watchlist'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\WatchlistController::show
* @see app/Http/Controllers/WatchlistController.php:0
* @route '/api/me/watchlist/{watchlist}'
*/
export const show = (args: { watchlist: string | number } | [watchlist: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/me/watchlist/{watchlist}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\WatchlistController::show
* @see app/Http/Controllers/WatchlistController.php:0
* @route '/api/me/watchlist/{watchlist}'
*/
show.url = (args: { watchlist: string | number } | [watchlist: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { watchlist: args }
    }

    if (Array.isArray(args)) {
        args = {
            watchlist: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        watchlist: args.watchlist,
    }

    return show.definition.url
            .replace('{watchlist}', parsedArgs.watchlist.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\WatchlistController::show
* @see app/Http/Controllers/WatchlistController.php:0
* @route '/api/me/watchlist/{watchlist}'
*/
show.get = (args: { watchlist: string | number } | [watchlist: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\WatchlistController::show
* @see app/Http/Controllers/WatchlistController.php:0
* @route '/api/me/watchlist/{watchlist}'
*/
show.head = (args: { watchlist: string | number } | [watchlist: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\WatchlistController::update
* @see app/Http/Controllers/WatchlistController.php:0
* @route '/api/me/watchlist/{watchlist}'
*/
export const update = (args: { watchlist: string | number } | [watchlist: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/me/watchlist/{watchlist}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\WatchlistController::update
* @see app/Http/Controllers/WatchlistController.php:0
* @route '/api/me/watchlist/{watchlist}'
*/
update.url = (args: { watchlist: string | number } | [watchlist: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { watchlist: args }
    }

    if (Array.isArray(args)) {
        args = {
            watchlist: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        watchlist: args.watchlist,
    }

    return update.definition.url
            .replace('{watchlist}', parsedArgs.watchlist.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\WatchlistController::update
* @see app/Http/Controllers/WatchlistController.php:0
* @route '/api/me/watchlist/{watchlist}'
*/
update.put = (args: { watchlist: string | number } | [watchlist: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\WatchlistController::update
* @see app/Http/Controllers/WatchlistController.php:0
* @route '/api/me/watchlist/{watchlist}'
*/
update.patch = (args: { watchlist: string | number } | [watchlist: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\WatchlistController::destroy
* @see app/Http/Controllers/WatchlistController.php:40
* @route '/api/me/watchlist/{watchlist}'
*/
export const destroy = (args: { watchlist: number | { id: number } } | [watchlist: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/me/watchlist/{watchlist}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\WatchlistController::destroy
* @see app/Http/Controllers/WatchlistController.php:40
* @route '/api/me/watchlist/{watchlist}'
*/
destroy.url = (args: { watchlist: number | { id: number } } | [watchlist: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { watchlist: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { watchlist: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            watchlist: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        watchlist: typeof args.watchlist === 'object'
        ? args.watchlist.id
        : args.watchlist,
    }

    return destroy.definition.url
            .replace('{watchlist}', parsedArgs.watchlist.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\WatchlistController::destroy
* @see app/Http/Controllers/WatchlistController.php:40
* @route '/api/me/watchlist/{watchlist}'
*/
destroy.delete = (args: { watchlist: number | { id: number } } | [watchlist: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const WatchlistController = { index, store, show, update, destroy }

export default WatchlistController