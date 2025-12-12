import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\TvController::index
* @see app/Http/Controllers/Admin/TvController.php:19
* @route '/dashboard/tv'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/tv',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TvController::index
* @see app/Http/Controllers/Admin/TvController.php:19
* @route '/dashboard/tv'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TvController::index
* @see app/Http/Controllers/Admin/TvController.php:19
* @route '/dashboard/tv'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TvController::index
* @see app/Http/Controllers/Admin/TvController.php:19
* @route '/dashboard/tv'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\TvController::create
* @see app/Http/Controllers/Admin/TvController.php:54
* @route '/dashboard/tv/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/dashboard/tv/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TvController::create
* @see app/Http/Controllers/Admin/TvController.php:54
* @route '/dashboard/tv/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TvController::create
* @see app/Http/Controllers/Admin/TvController.php:54
* @route '/dashboard/tv/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TvController::create
* @see app/Http/Controllers/Admin/TvController.php:54
* @route '/dashboard/tv/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\TvController::store
* @see app/Http/Controllers/Admin/TvController.php:62
* @route '/dashboard/tv'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/tv',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\TvController::store
* @see app/Http/Controllers/Admin/TvController.php:62
* @route '/dashboard/tv'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TvController::store
* @see app/Http/Controllers/Admin/TvController.php:62
* @route '/dashboard/tv'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\TvController::show
* @see app/Http/Controllers/Admin/TvController.php:78
* @route '/dashboard/tv/{tv}'
*/
export const show = (args: { tv: number | { id: number } } | [tv: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/dashboard/tv/{tv}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TvController::show
* @see app/Http/Controllers/Admin/TvController.php:78
* @route '/dashboard/tv/{tv}'
*/
show.url = (args: { tv: number | { id: number } } | [tv: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tv: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { tv: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            tv: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        tv: typeof args.tv === 'object'
        ? args.tv.id
        : args.tv,
    }

    return show.definition.url
            .replace('{tv}', parsedArgs.tv.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TvController::show
* @see app/Http/Controllers/Admin/TvController.php:78
* @route '/dashboard/tv/{tv}'
*/
show.get = (args: { tv: number | { id: number } } | [tv: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TvController::show
* @see app/Http/Controllers/Admin/TvController.php:78
* @route '/dashboard/tv/{tv}'
*/
show.head = (args: { tv: number | { id: number } } | [tv: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\TvController::edit
* @see app/Http/Controllers/Admin/TvController.php:90
* @route '/dashboard/tv/{tv}/edit'
*/
export const edit = (args: { tv: number | { id: number } } | [tv: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/dashboard/tv/{tv}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TvController::edit
* @see app/Http/Controllers/Admin/TvController.php:90
* @route '/dashboard/tv/{tv}/edit'
*/
edit.url = (args: { tv: number | { id: number } } | [tv: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tv: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { tv: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            tv: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        tv: typeof args.tv === 'object'
        ? args.tv.id
        : args.tv,
    }

    return edit.definition.url
            .replace('{tv}', parsedArgs.tv.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TvController::edit
* @see app/Http/Controllers/Admin/TvController.php:90
* @route '/dashboard/tv/{tv}/edit'
*/
edit.get = (args: { tv: number | { id: number } } | [tv: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TvController::edit
* @see app/Http/Controllers/Admin/TvController.php:90
* @route '/dashboard/tv/{tv}/edit'
*/
edit.head = (args: { tv: number | { id: number } } | [tv: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\TvController::update
* @see app/Http/Controllers/Admin/TvController.php:102
* @route '/dashboard/tv/{tv}'
*/
export const update = (args: { tv: number | { id: number } } | [tv: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/dashboard/tv/{tv}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\TvController::update
* @see app/Http/Controllers/Admin/TvController.php:102
* @route '/dashboard/tv/{tv}'
*/
update.url = (args: { tv: number | { id: number } } | [tv: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tv: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { tv: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            tv: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        tv: typeof args.tv === 'object'
        ? args.tv.id
        : args.tv,
    }

    return update.definition.url
            .replace('{tv}', parsedArgs.tv.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TvController::update
* @see app/Http/Controllers/Admin/TvController.php:102
* @route '/dashboard/tv/{tv}'
*/
update.put = (args: { tv: number | { id: number } } | [tv: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\TvController::update
* @see app/Http/Controllers/Admin/TvController.php:102
* @route '/dashboard/tv/{tv}'
*/
update.patch = (args: { tv: number | { id: number } } | [tv: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\TvController::destroy
* @see app/Http/Controllers/Admin/TvController.php:121
* @route '/dashboard/tv/{tv}'
*/
export const destroy = (args: { tv: number | { id: number } } | [tv: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/tv/{tv}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\TvController::destroy
* @see app/Http/Controllers/Admin/TvController.php:121
* @route '/dashboard/tv/{tv}'
*/
destroy.url = (args: { tv: number | { id: number } } | [tv: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tv: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { tv: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            tv: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        tv: typeof args.tv === 'object'
        ? args.tv.id
        : args.tv,
    }

    return destroy.definition.url
            .replace('{tv}', parsedArgs.tv.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TvController::destroy
* @see app/Http/Controllers/Admin/TvController.php:121
* @route '/dashboard/tv/{tv}'
*/
destroy.delete = (args: { tv: number | { id: number } } | [tv: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const tv = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default tv