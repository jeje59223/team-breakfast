import type { User } from '@/models/user.js';

export const getInitials = (user: User): string => {
  return `${user.firstname.charAt(0).toUpperCase()}${user.lastname.charAt(0).toUpperCase()}`;
};
