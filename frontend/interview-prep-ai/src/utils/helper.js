export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};
export const getInitials = (title) => {
  if (!title) return "";

  const words = title.trim().split(" ");

  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    if (words[i]) {
      initials += words[i][0];
    }
  }

  return initials.toUpperCase();
};