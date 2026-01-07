/**
 * Authentication Test Fixtures
 * Demo credentials for testing all user roles
 */

export const TEST_USERS = {
  admin: {
    email: 'admin@kolkata-corp.com',
    password: 'admin123',
    role: 'admin',
    dashboard: '/admin',
    name: 'Admin User',
  },
  organizer: {
    email: 'organizer@kolkata-corp.com',
    password: 'org123',
    role: 'organizer',
    dashboard: '/organizer',
    name: 'Organizer User',
  },
  participant: {
    email: 'participant@example.com',
    password: 'user123',
    role: 'participant',
    dashboard: '/participant',
    name: 'John Participant',
  },
  resort: {
    email: 'resort@resort.com',
    password: 'resort123',
    role: 'resort_contact',
    dashboard: '/resort',
    name: 'Resort Contact',
  },
};

export const INVALID_CREDENTIALS = {
  email: 'invalid@test.com',
  password: 'wrongpassword',
};

export const TEST_COMPANY_ID = '1';
