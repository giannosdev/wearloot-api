import { SetMetadata } from '@nestjs/common';

/**
 * Key for public route metadata
 */
export const IS_PUBLIC_KEY = 'isPublic';

/**
 * Public decorator
 * Used to mark routes that don't require authentication
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
