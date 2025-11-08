import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PersonFollowController::index
* @see app/Http/Controllers/PersonFollowController.php:0
* @route '/api/me/person'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/me/person',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PersonFollowController::index
* @see app/Http/Controllers/PersonFollowController.php:0
* @route '/api/me/person'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PersonFollowController::index
* @see app/Http/Controllers/PersonFollowController.php:0
* @route '/api/me/person'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PersonFollowController::index
* @see app/Http/Controllers/PersonFollowController.php:0
* @route '/api/me/person'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PersonFollowController::store
* @see app/Http/Controllers/PersonFollowController.php:0
* @route '/api/me/person'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/me/person',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PersonFollowController::store
* @see app/Http/Controllers/PersonFollowController.php:0
* @route '/api/me/person'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PersonFollowController::store
* @see app/Http/Controllers/PersonFollowController.php:0
* @route '/api/me/person'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PersonFollowController::show
* @see app/Http/Controllers/PersonFollowController.php:0
* @route '/api/me/person/{person}'
*/
export const show = (args: { person: string | number } | [person: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/me/person/{person}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PersonFollowController::show
* @see app/Http/Controllers/PersonFollowController.php:0
* @route '/api/me/person/{person}'
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
* @see \App\Http\Controllers\PersonFollowController::show
* @see app/Http/Controllers/PersonFollowController.php:0
* @route '/api/me/person/{person}'
*/
show.get = (args: { person: string | number } | [person: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PersonFollowController::show
* @see app/Http/Controllers/PersonFollowController.php:0
* @route '/api/me/person/{person}'
*/
show.head = (args: { person: string | number } | [person: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PersonFollowController::update
* @see app/Http/Controllers/PersonFollowController.php:11
* @route '/api/me/person/{person}'
*/
export const update = (args: { person: string | number } | [person: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/me/person/{person}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\PersonFollowController::update
* @see app/Http/Controllers/PersonFollowController.php:11
* @route '/api/me/person/{person}'
*/
update.url = (args: { person: string | number } | [person: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{person}', parsedArgs.person.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PersonFollowController::update
* @see app/Http/Controllers/PersonFollowController.php:11
* @route '/api/me/person/{person}'
*/
update.put = (args: { person: string | number } | [person: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\PersonFollowController::update
* @see app/Http/Controllers/PersonFollowController.php:11
* @route '/api/me/person/{person}'
*/
update.patch = (args: { person: string | number } | [person: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\PersonFollowController::destroy
* @see app/Http/Controllers/PersonFollowController.php:0
* @route '/api/me/person/{person}'
*/
export const destroy = (args: { person: string | number } | [person: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/me/person/{person}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\PersonFollowController::destroy
* @see app/Http/Controllers/PersonFollowController.php:0
* @route '/api/me/person/{person}'
*/
destroy.url = (args: { person: string | number } | [person: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{person}', parsedArgs.person.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PersonFollowController::destroy
* @see app/Http/Controllers/PersonFollowController.php:0
* @route '/api/me/person/{person}'
*/
destroy.delete = (args: { person: string | number } | [person: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const PersonFollowController = { index, store, show, update, destroy }

export default PersonFollowController