export const sanitizeUser = (user) => {
  if (!user) return null;
  const obj = user.toObject ? user.toObject() : { ...user };
  const { password, __v, ...rest } = obj;
  // Map _id to id when present
  if (rest._id) {
    rest.id = rest._id.toString();
    delete rest._id;
  }
  return rest;
};
