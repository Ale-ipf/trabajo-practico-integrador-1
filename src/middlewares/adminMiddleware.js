export const authAdminMiddleware = (req, res, next) => {
  const userLogged = req.userLogged;

  if (userLogged.role !== "admin") {
    return res.status(401).json({
      message: "Cannot acces to this source",
    });
  }
  next();
};