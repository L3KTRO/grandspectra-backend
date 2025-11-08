import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\TvController::index
* @see app/Http/Controllers/TvController.php:23
* @route '/api/tv'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/tv',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TvController::index
* @see app/Http/Controllers/TvController.php:23
* @route '/api/tv'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TvController::index
* @see app/Http/Controllers/TvController.php:23
* @route '/api/tv'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TvController::index
* @see app/Http/Controllers/TvController.php:23
* @route '/api/tv'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TvController::show
* @see app/Http/Controllers/TvController.php:55
* @route '/api/tv/{tv}'
*/
export const show = (args: { tv: string | number } | [tv: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/tv/{tv}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TvController::show
* @see app/Http/Controllers/TvController.php:55
* @route '/api/tv/{tv}'
*/
show.url = (args: { tv: string | number } | [tv: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tv: args }
    }

    if (Array.isArray(args)) {
        args = {
            tv: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        tv: args.tv,
    }

    return show.definition.url
            .replace('{tv}', parsedArgs.tv.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TvController::show
* @see app/Http/Controllers/TvController.php:55
* @route '/api/tv/{tv}'
*/
show.get = (args: { tv: string | number } | [tv: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TvController::show
* @see app/Http/Controllers/TvController.php:55
* @route '/api/tv/{tv}'
*/
show.head = (args: { tv: string | number } | [tv: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TvController::update
* @see app/Http/Controllers/TvController.php:32
* @route '/api/tv/{tv}'
*/
export const update = (args: { tv: string | number } | [tv: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/tv/{tv}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\TvController::update
* @see app/Http/Controllers/TvController.php:32
* @route '/api/tv/{tv}'
*/
update.url = (args: { tv: string | number } | [tv: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tv: args }
    }

    if (Array.isArray(args)) {
        args = {
            tv: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        tv: args.tv,
    }

    return update.definition.url
            .replace('{tv}', parsedArgs.tv.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TvController::update
* @see app/Http/Controllers/TvController.php:32
* @route '/api/tv/{tv}'
*/
update.put = (args: { tv: string | number } | [tv: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\TvController::update
* @see app/Http/Controllers/TvController.php:32
* @route '/api/tv/{tv}'
*/
update.patch = (args: { tv: string | number } | [tv: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

const tv = {
    index: Object.assign(index, index),
    show: Object.assign(show, show),
    update: Object.assign(update, update),
}

export default tv