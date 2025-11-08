import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\MovieController::index
* @see app/Http/Controllers/Admin/MovieController.php:13
* @route '/dashboard/movies'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/movies',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\MovieController::index
* @see app/Http/Controllers/Admin/MovieController.php:13
* @route '/dashboard/movies'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MovieController::index
* @see app/Http/Controllers/Admin/MovieController.php:13
* @route '/dashboard/movies'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\MovieController::index
* @see app/Http/Controllers/Admin/MovieController.php:13
* @route '/dashboard/movies'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\MovieController::create
* @see app/Http/Controllers/Admin/MovieController.php:21
* @route '/dashboard/movies/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/dashboard/movies/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\MovieController::create
* @see app/Http/Controllers/Admin/MovieController.php:21
* @route '/dashboard/movies/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MovieController::create
* @see app/Http/Controllers/Admin/MovieController.php:21
* @route '/dashboard/movies/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\MovieController::create
* @see app/Http/Controllers/Admin/MovieController.php:21
* @route '/dashboard/movies/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\MovieController::store
* @see app/Http/Controllers/Admin/MovieController.php:29
* @route '/dashboard/movies'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/movies',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\MovieController::store
* @see app/Http/Controllers/Admin/MovieController.php:29
* @route '/dashboard/movies'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MovieController::store
* @see app/Http/Controllers/Admin/MovieController.php:29
* @route '/dashboard/movies'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\MovieController::show
* @see app/Http/Controllers/Admin/MovieController.php:37
* @route '/dashboard/movies/{movie}'
*/
export const show = (args: { movie: string | number } | [movie: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/dashboard/movies/{movie}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\MovieController::show
* @see app/Http/Controllers/Admin/MovieController.php:37
* @route '/dashboard/movies/{movie}'
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
* @see \App\Http\Controllers\Admin\MovieController::show
* @see app/Http/Controllers/Admin/MovieController.php:37
* @route '/dashboard/movies/{movie}'
*/
show.get = (args: { movie: string | number } | [movie: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\MovieController::show
* @see app/Http/Controllers/Admin/MovieController.php:37
* @route '/dashboard/movies/{movie}'
*/
show.head = (args: { movie: string | number } | [movie: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\MovieController::edit
* @see app/Http/Controllers/Admin/MovieController.php:45
* @route '/dashboard/movies/{movie}/edit'
*/
export const edit = (args: { movie: string | number } | [movie: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/dashboard/movies/{movie}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\MovieController::edit
* @see app/Http/Controllers/Admin/MovieController.php:45
* @route '/dashboard/movies/{movie}/edit'
*/
edit.url = (args: { movie: string | number } | [movie: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{movie}', parsedArgs.movie.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MovieController::edit
* @see app/Http/Controllers/Admin/MovieController.php:45
* @route '/dashboard/movies/{movie}/edit'
*/
edit.get = (args: { movie: string | number } | [movie: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\MovieController::edit
* @see app/Http/Controllers/Admin/MovieController.php:45
* @route '/dashboard/movies/{movie}/edit'
*/
edit.head = (args: { movie: string | number } | [movie: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\MovieController::update
* @see app/Http/Controllers/Admin/MovieController.php:53
* @route '/dashboard/movies/{movie}'
*/
export const update = (args: { movie: string | number } | [movie: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/dashboard/movies/{movie}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\MovieController::update
* @see app/Http/Controllers/Admin/MovieController.php:53
* @route '/dashboard/movies/{movie}'
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
* @see \App\Http\Controllers\Admin\MovieController::update
* @see app/Http/Controllers/Admin/MovieController.php:53
* @route '/dashboard/movies/{movie}'
*/
update.put = (args: { movie: string | number } | [movie: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\MovieController::update
* @see app/Http/Controllers/Admin/MovieController.php:53
* @route '/dashboard/movies/{movie}'
*/
update.patch = (args: { movie: string | number } | [movie: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\MovieController::destroy
* @see app/Http/Controllers/Admin/MovieController.php:61
* @route '/dashboard/movies/{movie}'
*/
export const destroy = (args: { movie: string | number } | [movie: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/movies/{movie}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\MovieController::destroy
* @see app/Http/Controllers/Admin/MovieController.php:61
* @route '/dashboard/movies/{movie}'
*/
destroy.url = (args: { movie: string | number } | [movie: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{movie}', parsedArgs.movie.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MovieController::destroy
* @see app/Http/Controllers/Admin/MovieController.php:61
* @route '/dashboard/movies/{movie}'
*/
destroy.delete = (args: { movie: string | number } | [movie: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const MovieController = { index, create, store, show, edit, update, destroy }

export default MovieController