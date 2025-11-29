import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js';
import { roleHasPermission } from '../config/permissions.js';

export const authenticate = (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ error: 'Missing token' });

    const token = header.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { id, email, role }
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

export const requireRole = (role) => {
    return (req, res, next) => {
        if (!req.user || req.user.role !== role) {
            return res.status(403).json({ error: 'Access denied' });
        }
        next();
    };
};

export const requirePermission = (permission) => {
    return async (req, res, next) => {
        try {
            if (!req.user) return res.status(401).json({ error: 'Unauthenticated' });
            // Ensure latest role from DB (token might be stale after a role change)
            const dbUser = await prisma.user.findUnique({ where: { id: req.user.id }, select: { role: true, status: true } });
            if (!dbUser) return res.status(404).json({ error: 'User not found' });
            if (dbUser.status !== 'approved') return res.status(403).json({ error: 'Account not approved' });
            if (!roleHasPermission(dbUser.role, permission)) {
                return res.status(403).json({ error: 'Permission denied' });
            }
            // Attach fresh role
            req.user.role = dbUser.role;
            next();
        } catch (err) {
            res.status(500).json({ error: 'Permission check failed' });
        }
    };
};