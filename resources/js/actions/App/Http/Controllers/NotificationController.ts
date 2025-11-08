import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\NotificationController::index
* @see app/Http/Controllers/NotificationController.php:11
* @route '/api/me/notifications'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/me/notifications',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\NotificationController::index
* @see app/Http/Controllers/NotificationController.php:11
* @route '/api/me/notifications'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\NotificationController::index
* @see app/Http/Controllers/NotificationController.php:11
* @route '/api/me/notifications'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\NotificationController::index
* @see app/Http/Controllers/NotificationController.php:11
* @route '/api/me/notifications'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\NotificationController::markAsRead
* @see app/Http/Controllers/NotificationController.php:23
* @route '/api/me/notifications/{id}/read'
*/
export const markAsRead = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markAsRead.url(args, options),
    method: 'post',
})

markAsRead.definition = {
    methods: ["post"],
    url: '/api/me/notifications/{id}/read',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\NotificationController::markAsRead
* @see app/Http/Controllers/NotificationController.php:23
* @route '/api/me/notifications/{id}/read'
*/
markAsRead.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return markAsRead.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\NotificationController::markAsRead
* @see app/Http/Controllers/NotificationController.php:23
* @route '/api/me/notifications/{id}/read'
*/
markAsRead.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markAsRead.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\NotificationController::markAllAsRead
* @see app/Http/Controllers/NotificationController.php:34
* @route '/api/me/notifications/read-all'
*/
export const markAllAsRead = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markAllAsRead.url(options),
    method: 'post',
})

markAllAsRead.definition = {
    methods: ["post"],
    url: '/api/me/notifications/read-all',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\NotificationController::markAllAsRead
* @see app/Http/Controllers/NotificationController.php:34
* @route '/api/me/notifications/read-all'
*/
markAllAsRead.url = (options?: RouteQueryOptions) => {
    return markAllAsRead.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\NotificationController::markAllAsRead
* @see app/Http/Controllers/NotificationController.php:34
* @route '/api/me/notifications/read-all'
*/
markAllAsRead.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markAllAsRead.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\NotificationController::getUnreadCount
* @see app/Http/Controllers/NotificationController.php:41
* @route '/api/me/notifications/unread-count'
*/
export const getUnreadCount = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getUnreadCount.url(options),
    method: 'get',
})

getUnreadCount.definition = {
    methods: ["get","head"],
    url: '/api/me/notifications/unread-count',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\NotificationController::getUnreadCount
* @see app/Http/Controllers/NotificationController.php:41
* @route '/api/me/notifications/unread-count'
*/
getUnreadCount.url = (options?: RouteQueryOptions) => {
    return getUnreadCount.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\NotificationController::getUnreadCount
* @see app/Http/Controllers/NotificationController.php:41
* @route '/api/me/notifications/unread-count'
*/
getUnreadCount.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getUnreadCount.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\NotificationController::getUnreadCount
* @see app/Http/Controllers/NotificationController.php:41
* @route '/api/me/notifications/unread-count'
*/
getUnreadCount.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getUnreadCount.url(options),
    method: 'head',
})

const NotificationController = { index, markAsRead, markAllAsRead, getUnreadCount }

export default NotificationController