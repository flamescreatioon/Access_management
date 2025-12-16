// In-memory role templates (can be extended to a DB table later)
const roleTemplates = {
  admin: { name: 'admin', description: 'Full system control', permissions: ['user:create', 'user:read', 'user:update', 'user:delete', 'role:manage', 'report:generate'] },
  staff: { name: 'staff', description: 'Staff member', permissions: ['user:read', 'user:update', 'report:view'] },
  volunteer: { name: 'volunteer', description: 'Volunteer', permissions: ['user:read'] },
  student: { name: 'student', description: 'Student', permissions: ['user:read'] },
  member: { name: 'member', description: 'Member', permissions: ['user:read'] },
  guest: { name: 'guest', description: 'Guest', permissions: [] }
};

import prisma from '../lib/prisma.js';
import { PERMISSIONS } from '../config/permissions.js';

export const listRoles = async (_req, res) => {
  try {
    const roles = Object.entries(roleTemplates).map(([key, val]) => ({ id: key, ...val }));
    res.json({ count: roles.length, roles });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getRoleById = async (req, res) => {
  try {
    const { roleId } = req.params;
    const role = roleTemplates[roleId];
    if (!role) return res.status(404).json({ error: 'Role not found' });
    res.json({ id: roleId, ...role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createRole = async (req, res) => {
  try {
    const { name, description, permissions } = req.body;
    if (!name) return res.status(400).json({ error: 'Role name is required' });
    if (roleTemplates[name]) return res.status(409).json({ error: 'Role already exists' });
    roleTemplates[name] = { name, description: description || '', permissions: permissions || [] };
    res.status(201).json({ message: 'Role created', id: name, ...roleTemplates[name] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateRole = async (req, res) => {
  try {
    const { roleId } = req.params;
    const { description, permissions } = req.body;
    if (!roleTemplates[roleId]) return res.status(404).json({ error: 'Role not found' });
    if (description !== undefined) roleTemplates[roleId].description = description;
    if (permissions !== undefined) roleTemplates[roleId].permissions = permissions;
    res.json({ message: 'Role updated', id: roleId, ...roleTemplates[roleId] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteRole = async (req, res) => {
  try {
    const { roleId } = req.params;
    if (!roleTemplates[roleId]) return res.status(404).json({ error: 'Role not found' });
    if (['admin', 'member'].includes(roleId)) return res.status(403).json({ error: 'Cannot delete built-in roles' });
    delete roleTemplates[roleId];
    res.json({ message: 'Role deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
