import checkCreator from "./checkCreator.js";

const roomAccess = {
  update: {
    roles: ["admin", "editor"],
    creator: checkCreator,
  },
  delete: {
    roles: ["admin", "editor"],
    creator: checkCreator,
  },
};

export default roomAccess;
