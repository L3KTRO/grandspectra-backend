import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ContentListController::index
* @see app/Http/Controllers/ContentListController.php:16
* @route '/api/lists'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/lists',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ContentListController::index
* @see app/Http/Controllers/ContentListController.php:16
* @route '/api/lists'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ContentListController::index
* @see app/Http/Controllers/ContentListController.php:16
* @route '/api/lists'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ContentListController::index
* @see app/Http/Controllers/ContentListController.php:16
* @route '/api/lists'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ContentListController::store
* @see app/Http/Controllers/ContentListController.php:41
* @route '/api/lists'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/lists',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ContentListController::store
* @see app/Http/Controllers/ContentListController.php:41
* @route '/api/lists'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ContentListController::store
* @see app/Http/Controllers/ContentListController.php:41
* @route '/api/lists'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ContentListController::show
* @see app/Http/Controllers/ContentListController.php:22
* @route '/api/lists/{id}'
*/
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/lists/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ContentListController::show
* @see app/Http/Controllers/ContentListController.php:22
* @route '/api/lists/{id}'
*/
show.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return show.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ContentListController::show
* @see app/Http/Controllers/ContentListController.php:22
* @route '/api/lists/{id}'
*/
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ContentListController::show
* @see app/Http/Controllers/ContentListController.php:22
* @route '/api/lists/{id}'
*/
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ContentListController::update
* @see app/Http/Controllers/ContentListController.php:70
* @route '/api/lists/{id}'
*/
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/lists/{id}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\ContentListController::update
* @see app/Http/Controllers/ContentListController.php:70
* @route '/api/lists/{id}'
*/
update.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return update.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ContentListController::update
* @see app/Http/Controllers/ContentListController.php:70
* @route '/api/lists/{id}'
*/
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\ContentListController::update
* @see app/Http/Controllers/ContentListController.php:70
* @route '/api/lists/{id}'
*/
update.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\ContentListController::destroy
* @see app/Http/Controllers/ContentListController.php:109
* @route '/api/lists/{id}'
*/
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/lists/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ContentListController::destroy
* @see app/Http/Controllers/ContentListController.php:109
* @route '/api/lists/{id}'
*/
destroy.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return destroy.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ContentListController::destroy
* @see app/Http/Controllers/ContentListController.php:109
* @route '/api/lists/{id}'
*/
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\ContentListController::vote
* @see app/Http/Controllers/ContentListController.php:132
* @route '/api/lists/{id}/vote'
*/
export const vote = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: vote.url(args, options),
    method: 'put',
})

vote.definition = {
    methods: ["put"],
    url: '/api/lists/{id}/vote',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\ContentListController::vote
* @see app/Http/Controllers/ContentListController.php:132
* @route '/api/lists/{id}/vote'
*/
vote.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return vote.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ContentListController::vote
* @see app/Http/Controllers/ContentListController.php:132
* @route '/api/lists/{id}/vote'
*/
vote.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: vote.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\ContentListController::unvote
* @see app/Http/Controllers/ContentListController.php:161
* @route '/api/lists/{id}/vote'
*/
export const unvote = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: unvote.url(args, options),
    method: 'delete',
})

unvote.definition = {
    methods: ["delete"],
    url: '/api/lists/{id}/vote',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ContentListController::unvote
* @see app/Http/Controllers/ContentListController.php:161
* @route '/api/lists/{id}/vote'
*/
unvote.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return unvote.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ContentListController::unvote
* @see app/Http/Controllers/ContentListController.php:161
* @route '/api/lists/{id}/vote'
*/
unvote.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: unvote.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\ContentListController::save
* @see app/Http/Controllers/ContentListController.php:180
* @route '/api/lists/{id}/save'
*/
export const save = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: save.url(args, options),
    method: 'put',
})

save.definition = {
    methods: ["put"],
    url: '/api/lists/{id}/save',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\ContentListController::save
* @see app/Http/Controllers/ContentListController.php:180
* @route '/api/lists/{id}/save'
*/
save.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return save.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ContentListController::save
* @see app/Http/Controllers/ContentListController.php:180
* @route '/api/lists/{id}/save'
*/
save.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: save.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\ContentListController::unsave
* @see app/Http/Controllers/ContentListController.php:204
* @route '/api/lists/{id}/save'
*/
export const unsave = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: unsave.url(args, options),
    method: 'delete',
})

unsave.definition = {
    methods: ["delete"],
    url: '/api/lists/{id}/save',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ContentListController::unsave
* @see app/Http/Controllers/ContentListController.php:204
* @route '/api/lists/{id}/save'
*/
unsave.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return unsave.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ContentListController::unsave
* @see app/Http/Controllers/ContentListController.php:204
* @route '/api/lists/{id}/save'
*/
unsave.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: unsave.url(args, options),
    method: 'delete',
})

const ContentListController = { index, store, show, update, destroy, vote, unvote, save, unsave }

export default ContentListController