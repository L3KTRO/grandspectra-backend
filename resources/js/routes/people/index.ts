import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\PersonController::index
* @see app/Http/Controllers/PersonController.php:24
* @route '/api/people'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/people',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PersonController::index
* @see app/Http/Controllers/PersonController.php:24
* @route '/api/people'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PersonController::index
* @see app/Http/Controllers/PersonController.php:24
* @route '/api/people'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PersonController::index
* @see app/Http/Controllers/PersonController.php:24
* @route '/api/people'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PersonController::show
* @see app/Http/Controllers/PersonController.php:20
* @route '/api/people/{person}'
*/
export const show = (args: { person: string | number } | [person: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/people/{person}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PersonController::show
* @see app/Http/Controllers/PersonController.php:20
* @route '/api/people/{person}'
*/
show.url = (args: { person: string | number } | [person: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { person: args }
    }

    if (Array.isArray(args)) {
        args = {
            person: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        person: args.person,
    }

    return show.definition.url
            .replace('{person}', parsedArgs.person.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PersonController::show
* @see app/Http/Controllers/PersonController.php:20
* @route '/api/people/{person}'
*/
show.get = (args: { person: string | number } | [person: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PersonController::show
* @see app/Http/Controllers/PersonController.php:20
* @route '/api/people/{person}'
*/
show.head = (args: { person: string | number } | [person: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

const people = {
    index: Object.assign(index, index),
    show: Object.assign(show, show),
}

export default people