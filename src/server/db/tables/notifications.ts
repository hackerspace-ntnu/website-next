import { pgEnum } from 'drizzle-orm/pg-core';
import { notificationSettings } from '@/lib/constants';

const notificationsEnum = pgEnum('notifications', notificationSettings);

export { notificationsEnum };
