const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.roles) {
      return res.status(403).json({ success: false, message: 'No roles found' });
    }

    const normalizedRoles = req.user.roles.map((role) => String(role).trim().toLowerCase());
    const hasRole = normalizedRoles.includes('developer')
      || allowedRoles.some((role) => normalizedRoles.includes(String(role).trim().toLowerCase()));

    if (!hasRole) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required role: ${allowedRoles.join(' or ')}`,
      });
    }

    next();
  };
};

module.exports = { requireRole };
