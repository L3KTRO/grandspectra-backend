import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\WatchedController::index
* @see app/Http/Controllers/WatchedController.php:13
* @route '/api/me/watched'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/me/watched',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\WatchedController::index
* @see app/Http/Controllers/WatchedController.php:13
* @route '/api/me/watched'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\WatchedController::index
* @see app/Http/Controllers/WatchedController.php:13
* @route '/api/me/watched'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\WatchedController::index
* @see app/Http/Controllers/WatchedController.php:13
* @route '/api/me/watched'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\WatchedController::store
* @see app/Http/Controllers/WatchedController.php:24
* @route '/api/me/watched'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/me/watched',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\WatchedController::store
* @see app/Http/Controllers/WatchedController.php:24
* @route '/api/me/watched'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\WatchedController::store
* @see app/Http/Controllers/WatchedController.php:24
* @route '/api/me/watched'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\WatchedController::show
* @see app/Http/Controllers/WatchedController.php:0
* @route '/api/me/watched/{watched}'
*/
export const show = (args: { watched: string | number } | [watched: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/me/watched/{watched}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\WatchedController::show
* @see app/Http/Controllers/WatchedController.php:0
* @route '/api/me/watched/{watched}'
*/
show.url = (args: { watched: string | number } | [watched: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { watched: args }
    }

    if (Array.isArray(args)) {
        args = {
            watched: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        watched: args.watched,
    }

    return show.definition.url
            .replace('{watched}', parsedArgs.watched.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\WatchedController::show
* @see app/Http/Controllers/WatchedController.php:0
* @route '/api/me/watched/{watched}'
*/
show.get = (args: { watched: string | number } | [watched: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\WatchedController::show
* @see app/Http/Controllers/WatchedController.php:0
* @route '/api/me/watched/{watched}'
*/
show.head = (args: { watched: string | number } | [watched: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\WatchedController::update
* @see app/Http/Controllers/WatchedController.php:0
* @route '/api/me/watched/{watched}'
*/
export const update = (args: { watched: string | number } | [watched: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/me/watched/{watched}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\WatchedController::update
* @see app/Http/Controllers/WatchedController.php:0
* @route '/api/me/watched/{watched}'
*/
update.url = (args: { watched: string | number } | [watched: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { watched: args }
    }

    if (Array.isArray(args)) {
        args = {
            watched: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        watched: args.watched,
    }

    return update.definition.url
            .replace('{watched}', parsedArgs.watched.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\WatchedController::update
* @see app/Http/Controllers/WatchedController.php:0
* @route '/api/me/watched/{watched}'
*/
update.put = (args: { watched: string | number } | [watched: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\WatchedController::update
* @see app/Http/Controllers/WatchedController.php:0
* @route '/api/me/watched/{watched}'
*/
update.patch = (args: { watched: string | number } | [watched: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\WatchedController::destroy
* @see app/Http/Controllers/WatchedController.php:38
* @route '/api/me/watched/{watched}'
*/
export const destroy = (args: { watched: number | { id: number } } | [watched: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/me/watched/{watched}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\WatchedController::destroy
* @see app/Http/Controllers/WatchedController.php:38
* @route '/api/me/watched/{watched}'
*/
destroy.url = (args: { watched: number | { id: number } } | [watched: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { watched: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { watched: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            watched: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        watched: typeof args.watched === 'object'
        ? args.watched.id
        : args.watched,
    }

    return destroy.definition.url
            .replace('{watched}', parsedArgs.watched.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\WatchedController::destroy
* @see app/Http/Controllers/WatchedController.php:38
* @route '/api/me/watched/{watched}'
*/
destroy.delete = (args: { watched: number | { id: number } } | [watched: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const watched = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default watched