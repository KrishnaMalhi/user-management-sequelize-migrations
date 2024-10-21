// middleware/checkPermissions.js
const { User, Role, Permission } = require("../models");

const checkPermission = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      const user = await User.findByPk(req.user.id, {
        include: {
          model: Role,
          as: "role",
          include: {
            model: Permission,
            through: "RolePermissions",
          },
        },
      });

      if (!user) {
        return res.status(403).json({ message: "User not found" });
      }

      const hasPermission = user.role.Permissions.some(
        (permission) =>
          permission.action === requiredPermission.action &&
          permission.resource === requiredPermission.resource
      );

      if (!hasPermission) {
        return res
          .status(403)
          .json({ message: "You do not have the necessary permissions" });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
};

module.exports = checkPermission;


// router.get(
//     '/accounting',
//     checkPermission({ action: 'read', resource: 'accounting' }),
//     (req, res) => {
//       res.send('Welcome to the accounting module');
//     }
//   );