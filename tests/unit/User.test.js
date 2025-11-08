/**
 * User Model Tests
 */

const User = require('../../src/models/User');

describe('User Model', () => {
  let user;

  beforeEach(() => {
    user = new User('1', 'testuser', 'test@example.com', ['user']);
  });

  describe('constructor', () => {
    test('should create a user with valid properties', () => {
      expect(user.id).toBe('1');
      expect(user.username).toBe('testuser');
      expect(user.email).toBe('test@example.com');
      expect(user.roles).toEqual(['user']);
      expect(user.createdAt).toBeInstanceOf(Date);
      expect(user.updatedAt).toBeInstanceOf(Date);
    });
  });

  describe('hasRole', () => {
    test('should return true if user has the role', () => {
      expect(user.hasRole('user')).toBe(true);
    });

    test('should return false if user does not have the role', () => {
      expect(user.hasRole('admin')).toBe(false);
    });
  });

  describe('addRole', () => {
    test('should add a new role to the user', () => {
      user.addRole('admin');
      expect(user.roles).toContain('admin');
    });

    test('should not add duplicate roles', () => {
      user.addRole('user');
      expect(user.roles.filter(r => r === 'user').length).toBe(1);
    });

    test('should update updatedAt timestamp', () => {
      const oldTimestamp = user.updatedAt;
      setTimeout(() => {
        user.addRole('admin');
        expect(user.updatedAt.getTime()).toBeGreaterThanOrEqual(oldTimestamp.getTime());
      }, 10);
    });
  });

  describe('removeRole', () => {
    test('should remove a role from the user', () => {
      user.removeRole('user');
      expect(user.roles).not.toContain('user');
    });

    test('should update updatedAt timestamp', () => {
      const oldTimestamp = user.updatedAt;
      setTimeout(() => {
        user.removeRole('user');
        expect(user.updatedAt.getTime()).toBeGreaterThanOrEqual(oldTimestamp.getTime());
      }, 10);
    });
  });

  describe('toJSON', () => {
    test('should return a JSON representation of the user', () => {
      const json = user.toJSON();
      expect(json).toHaveProperty('id');
      expect(json).toHaveProperty('username');
      expect(json).toHaveProperty('email');
      expect(json).toHaveProperty('roles');
      expect(json).toHaveProperty('createdAt');
      expect(json).toHaveProperty('updatedAt');
    });
  });
});
