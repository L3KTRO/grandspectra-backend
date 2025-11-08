import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\GenreController::index
* @see app/Http/Controllers/GenreController.php:24
* @route '/api/genres'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/genres',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\GenreController::index
* @see app/Http/Controllers/GenreController.php:24
* @route '/api/genres'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\GenreController::index
* @see app/Http/Controllers/GenreController.php:24
* @route '/api/genres'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\GenreController::index
* @see app/Http/Controllers/GenreController.php:24
* @route '/api/genres'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\GenreController::show
* @see app/Http/Controllers/GenreController.php:55
* @route '/api/genres/{genre}'
*/
export const show = (args: { genre: string | number } | [genre: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/genres/{genre}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\GenreController::show
* @see app/Http/Controllers/GenreController.php:55
* @route '/api/genres/{genre}'
*/
show.url = (args: { genre: string | number } | [genre: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { genre: args }
    }

    if (Array.isArray(args)) {
        args = {
            genre: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        genre: args.genre,
    }

    return show.definition.url
            .replace('{genre}', parsedArgs.genre.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\GenreController::show
* @see app/Http/Controllers/GenreController.php:55
* @route '/api/genres/{genre}'
*/
show.get = (args: { genre: string | number } | [genre: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\GenreController::show
* @see app/Http/Controllers/GenreController.php:55
* @route '/api/genres/{genre}'
*/
show.head = (args: { genre: string | number } | [genre: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

const GenreController = { index, show }

export default GenreController