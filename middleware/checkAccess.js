const checkAccess = (permission) => {
  return async (req, res, next) => {
    if (permission.roles.includes(req.user?.role)) {
      return next();
    }
    if (!permission?.creator) {
      return res
        .status(401)
        .json({ success: false, messge: "Access Denied..!" });
    }
    const isCreator = await permission.creator(req);
    if (isCreator === true) {
      return next();
    }
    if (isCreator === false) {
      return res
        .status(401)
        .json({ success: false, messge: "Access Denied..!" });
    }
    return res
      .status(500)
      .json({ success: false, messge: "Something Went Wrong..!" });
  };
};
export default checkAccess;
