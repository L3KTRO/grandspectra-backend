<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::disableForeignKeyConstraints();

        $tablesToDelete = [
            // Tablas sin dependencias
            'pulse_values',
            'git_updates',
            'media_languages',
            'regiones',
            'resolutions',
            'types',
            'automatic_torrent_freeleeches',
            'blacklist_clients',
            'bon_exchanges',
            'donation_gateways',
            'donation_packages',
            'email_updates',
            'failed_login_attempts',
            'freeleech_tokens',
            'gifts',
            'invites',
            'password_reset_histories',
            'password_resets',
            'personal_freeleeches',
            'rsskeys',
            'seedboxes',
            'subtitles',
            'ticket_attachments',
            'ticket_categories',
            'ticket_notes',
            'ticket_priorities',
            'unregistered_info_hashes',
            'user_audibles',
            'user_echoes',
            'user_notes',
            'whitelisted_image_urls',
            'wiki_categories',
            'wishes',

            // Nivel 1 - Dependen de las anteriores
            'achievement_progress',
            'application_image_proofs',
            'application_url_proofs',
            'blocked_ips',
            'bookmarks',
            'claimed_prizes',
            'failed_jobs',
            'messages',
            'participants',
            'playlist_torrents',
            'post_tips',
            'prizes',
            'request_bounty',
            'request_claims',
            'resurrections',
            'torrent_downloads',
            'torrent_tips',
            'torrent_trumps',

            // Nivel 2 - Dependen de Nivel 1
            'applications',
            'donations',
            'featured_torrents',
            'likes',
            'polls',
            'private_messages',
            'recommendations',
            'reports',
            'subscriptions',
            'thanks',
            'topic_reads',

            // Nivel 3 - Dependen de Nivel 2
            'articles',
            'comments',
            'events',
            'forum_permissions',
            'posts',
            'requests',
            'topics',

            // Nivel 4 - Tablas base
            'achievement_details',
            'announces',
            'apikeys',
            'audits',
            'bots',
            'cache_locks',
            'categories',
            'chat_statuses',
            'chatrooms',
            'conversations',
            'distributors',
            'forum_categories',
            'forums',
            'groups',
            'internals',
            'internal_user',
            'job_batches',
            'keywords',
            'options',
            'pages',
            'passkeys',
            'peers',
            'playlists',
            'pulse_aggregates',
            'pulse_entries',
            'tickets',
            'user_notifications',
            'user_privacy',
            "wikis",
            "warnings",
            "voters",
            "users",
            ""
        ];

        foreach ($tablesToDelete as $table) {
            Schema::dropIfExists($table);
        }

        Schema::enableForeignKeyConstraints();
    }

    public function down()
    {
        // Irreversible por seguridad
    }
};
