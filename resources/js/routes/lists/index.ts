import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
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

const lists = {
    index: Object.assign(index, index),
}

export default lists