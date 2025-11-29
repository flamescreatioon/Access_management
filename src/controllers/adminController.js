import prisma from '../lib/prisma.js'
import { PERMISSIONS } from '../config/permissions.js'

export const getPendingUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            where: { status: 'pending' },
            select: { id: true, name: true, email: true, role: true, created_at: true }
        })
        res.json({ count: users.length, users })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const approveUser = async (req, res) => {
    try {
        const { userId } = req.params
        const user = await prisma.user.update({
            where: { id: userId },
            data: { status: 'approved' }
        })
        res.json({ message: `User ${user.name} approved successfully.` })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const rejectUser = async (req, res) => {
    try {
        const { userId } = req.params
        const user = await prisma.user.update({
            where: { id: userId },
            data: { status: 'rejected' }
        })
        res.json({ message: `User ${user.name} rejected successfully.` })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// ----- User Management -----
export const listUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({ select: { id: true, name: true, email: true, role: true, status: true } })
        res.json({ count: users.length, users })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const createUser = async (req, res) => {
    try {
        const { name, email, password, role = 'member', status = 'pending', Registration_number, Department, College } = req.body
        if (!name || !email || !password) return res.status(400).json({ error: 'Name, email, and password are required' })
        const normalizedEmail = String(email).trim().toLowerCase()
        const exists = await prisma.user.findUnique({ where: { email: normalizedEmail } })
        if (exists) return res.status(409).json({ error: 'Email already in use' })
        const bcrypt = await import('bcrypt')
        const hashed = await bcrypt.default.hash(password, 10)
        const user = await prisma.user.create({
            data: { name: name.trim(), email: normalizedEmail, password: hashed, role, status, Registration_number, Department, College }
        })
        res.status(201).json({ message: 'User created', user: { id: user.id, name: user.name, email: user.email, role: user.role, status: user.status } })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const updateUserRole = async (req, res) => {
    try {
        const { userId } = req.params
        const { role } = req.body
        const updated = await prisma.user.update({ where: { id: userId }, data: { role } })
        res.json({ message: 'Role updated', user: { id: updated.id, role: updated.role } })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const deactivateUser = async (req, res) => {
    try {
        const { userId } = req.params
        const updated = await prisma.user.update({ where: { id: userId }, data: { status: 'rejected' } })
        res.json({ message: 'User deactivated', user: { id: updated.id, status: updated.status } })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const updateUser = async (req, res) => {
    try {
        const { userId } = req.params
        const { name, email, role, status, Registration_number, Department, College } = req.body
        const data = {}
        if (name) data.name = String(name).trim()
        if (email) data.email = String(email).trim().toLowerCase()
        if (role) data.role = role
        if (status) data.status = status
        if (Registration_number !== undefined) data.Registration_number = Registration_number
        if (Department !== undefined) data.Department = Department
        if (College !== undefined) data.College = College
        const updated = await prisma.user.update({ where: { id: userId }, data })
        res.json({ message: 'User updated', user: { id: updated.id, name: updated.name, email: updated.email, role: updated.role, status: updated.status } })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params
        await prisma.user.delete({ where: { id: userId } })
        res.json({ message: 'User deleted' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// ----- System Configuration (placeholders) -----
export const getSystemConfig = async (_req, res) => {
    res.json({ authPolicies: { passwordMinLength: 8 }, notifications: { emailEnabled: true } })
}

export const updateSystemConfig = async (req, res) => {
    // Placeholder (persist to DB/table later)
    res.json({ message: 'System configuration updated', changes: req.body })
}

// ----- Reports (placeholders) -----
export const generateAccessReport = async (_req, res) => {
    // Example aggregate
    const byRole = await prisma.user.groupBy({ by: ['role'], _count: { id: true } })
    res.json({ generatedAt: new Date().toISOString(), byRole })
}

// ----- Backups (placeholder) -----
export const runBackup = async (_req, res) => {
    res.json({ message: 'Backup started (placeholder)' })
}

export const restoreBackup = async (_req, res) => {
    res.json({ message: 'Restore initiated (placeholder)' })
}

// ----- Announcements & Alerts (placeholders) -----
export const sendAnnouncement = async (req, res) => {
    const { subject, body } = req.body
    res.json({ message: 'Announcement queued', subject, length: body?.length || 0 })
}

export const configureAlerts = async (req, res) => {
    res.json({ message: 'Alert configuration saved', config: req.body })
}