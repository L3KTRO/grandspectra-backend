import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ReviewController::index
* @see app/Http/Controllers/ReviewController.php:0
* @route '/api/me/reviews'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/me/reviews',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReviewController::index
* @see app/Http/Controllers/ReviewController.php:0
* @route '/api/me/reviews'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReviewController::index
* @see app/Http/Controllers/ReviewController.php:0
* @route '/api/me/reviews'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ReviewController::index
* @see app/Http/Controllers/ReviewController.php:0
* @route '/api/me/reviews'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ReviewController::store
* @see app/Http/Controllers/ReviewController.php:12
* @route '/api/me/reviews'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/me/reviews',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ReviewController::store
* @see app/Http/Controllers/ReviewController.php:12
* @route '/api/me/reviews'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReviewController::store
* @see app/Http/Controllers/ReviewController.php:12
* @route '/api/me/reviews'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ReviewController::show
* @see app/Http/Controllers/ReviewController.php:0
* @route '/api/me/reviews/{review}'
*/
export const show = (args: { review: string | number } | [review: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/me/reviews/{review}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReviewController::show
* @see app/Http/Controllers/ReviewController.php:0
* @route '/api/me/reviews/{review}'
*/
show.url = (args: { review: string | number } | [review: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { review: args }
    }

    if (Array.isArray(args)) {
        args = {
            review: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        review: args.review,
    }

    return show.definition.url
            .replace('{review}', parsedArgs.review.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReviewController::show
* @see app/Http/Controllers/ReviewController.php:0
* @route '/api/me/reviews/{review}'
*/
show.get = (args: { review: string | number } | [review: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ReviewController::show
* @see app/Http/Controllers/ReviewController.php:0
* @route '/api/me/reviews/{review}'
*/
show.head = (args: { review: string | number } | [review: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ReviewController::update
* @see app/Http/Controllers/ReviewController.php:26
* @route '/api/me/reviews/{review}'
*/
export const update = (args: { review: number | { id: number } } | [review: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/me/reviews/{review}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\ReviewController::update
* @see app/Http/Controllers/ReviewController.php:26
* @route '/api/me/reviews/{review}'
*/
update.url = (args: { review: number | { id: number } } | [review: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { review: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { review: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            review: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        review: typeof args.review === 'object'
        ? args.review.id
        : args.review,
    }

    return update.definition.url
            .replace('{review}', parsedArgs.review.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReviewController::update
* @see app/Http/Controllers/ReviewController.php:26
* @route '/api/me/reviews/{review}'
*/
update.put = (args: { review: number | { id: number } } | [review: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\ReviewController::update
* @see app/Http/Controllers/ReviewController.php:26
* @route '/api/me/reviews/{review}'
*/
update.patch = (args: { review: number | { id: number } } | [review: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\ReviewController::destroy
* @see app/Http/Controllers/ReviewController.php:44
* @route '/api/me/reviews/{review}'
*/
export const destroy = (args: { review: number | { id: number } } | [review: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/me/reviews/{review}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ReviewController::destroy
* @see app/Http/Controllers/ReviewController.php:44
* @route '/api/me/reviews/{review}'
*/
destroy.url = (args: { review: number | { id: number } } | [review: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { review: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { review: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            review: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        review: typeof args.review === 'object'
        ? args.review.id
        : args.review,
    }

    return destroy.definition.url
            .replace('{review}', parsedArgs.review.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReviewController::destroy
* @see app/Http/Controllers/ReviewController.php:44
* @route '/api/me/reviews/{review}'
*/
destroy.delete = (args: { review: number | { id: number } } | [review: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const ReviewController = { index, store, show, update, destroy }

export default ReviewController