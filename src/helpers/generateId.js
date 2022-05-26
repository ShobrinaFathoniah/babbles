export const generateId = (user, selectedUser) => {
  return (user + selectedUser).split('').sort().join('');
};
