export const checkObj = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};
