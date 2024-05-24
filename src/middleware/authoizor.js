function authorize(allowedRoles) {
    return (req, res, next) => {
      const userRole = req.user.role;

      if (allowedRoles.includes(userRole)) {
        return next();
      }

      return res.status(403).json({ message: 'Forbidden' });
    };
  }

module.exports = authorize;
