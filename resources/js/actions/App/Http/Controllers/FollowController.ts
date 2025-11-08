import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\FollowController::index
* @see app/Http/Controllers/FollowController.php:0
* @route '/api/me/follow'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/me/follow',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\FollowController::index
* @see app/Http/Controllers/FollowController.php:0
* @route '/api/me/follow'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FollowController::index
* @see app/Http/Controllers/FollowController.php:0
* @route '/api/me/follow'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\FollowController::index
* @see app/Http/Controllers/FollowController.php:0
* @route '/api/me/follow'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\FollowController::store
* @see app/Http/Controllers/FollowController.php:0
* @route '/api/me/follow'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/me/follow',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\FollowController::store
* @see app/Http/Controllers/FollowController.php:0
* @route '/api/me/follow'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FollowController::store
* @see app/Http/Controllers/FollowController.php:0
* @route '/api/me/follow'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\FollowController::show
* @see app/Http/Controllers/FollowController.php:0
* @route '/api/me/follow/{follow}'
*/
export const show = (args: { follow: string | number } | [follow: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/me/follow/{follow}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\FollowController::show
* @see app/Http/Controllers/FollowController.php:0
* @route '/api/me/follow/{follow}'
*/
show.url = (args: { follow: string | number } | [follow: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { follow: args }
    }

    if (Array.isArray(args)) {
        args = {
            follow: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        follow: args.follow,
    }

    return show.definition.url
            .replace('{follow}', parsedArgs.follow.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\FollowController::show
* @see app/Http/Controllers/FollowController.php:0
* @route '/api/me/follow/{follow}'
*/
show.get = (args: { follow: string | number } | [follow: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\FollowController::show
* @see app/Http/Controllers/FollowController.php:0
* @route '/api/me/follow/{follow}'
*/
show.head = (args: { follow: string | number } | [follow: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\FollowController::update
* @see app/Http/Controllers/FollowController.php:17
* @route '/api/me/follow/{follow}'
*/
export const update = (args: { follow: string | number } | [follow: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/me/follow/{follow}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\FollowController::update
* @see app/Http/Controllers/FollowController.php:17
* @route '/api/me/follow/{follow}'
*/
update.url = (args: { follow: string | number } | [follow: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { follow: args }
    }

    if (Array.isArray(args)) {
        args = {
            follow: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        follow: args.follow,
    }

    return update.definition.url
            .replace('{follow}', parsedArgs.follow.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\FollowController::update
* @see app/Http/Controllers/FollowController.php:17
* @route '/api/me/follow/{follow}'
*/
update.put = (args: { follow: string | number } | [follow: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\FollowController::update
* @see app/Http/Controllers/FollowController.php:17
* @route '/api/me/follow/{follow}'
*/
update.patch = (args: { follow: string | number } | [follow: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\FollowController::destroy
* @see app/Http/Controllers/FollowController.php:39
* @route '/api/me/follow/{follow}'
*/
export const destroy = (args: { follow: string | number } | [follow: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/me/follow/{follow}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\FollowController::destroy
* @see app/Http/Controllers/FollowController.php:39
* @route '/api/me/follow/{follow}'
*/
destroy.url = (args: { follow: string | number } | [follow: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { follow: args }
    }

    if (Array.isArray(args)) {
        args = {
            follow: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        follow: args.follow,
    }

    return destroy.definition.url
            .replace('{follow}', parsedArgs.follow.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\FollowController::destroy
* @see app/Http/Controllers/FollowController.php:39
* @route '/api/me/follow/{follow}'
*/
destroy.delete = (args: { follow: string | number } | [follow: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const FollowController = { index, store, show, update, destroy }

export default FollowController