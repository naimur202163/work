export const getRoleIdByPackageName = (packageName) => {
  if (packageName === "FREE") {
    return 0;
  }
  if (packageName === "BASIC") {
    return 1;
  }
  if (packageName === "PREMIUM") {
    return 2;
  }
  return "";
};

export const STATIC_CATEGORIES = {
  ALL: -1,
  FEATURED: -2,
  TRENDING: -3,
  STAFF_PICKS: -4,
};
