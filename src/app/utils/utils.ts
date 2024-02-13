export const formatDate = (date: string) => {
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  }).format(new Date(date));
};

export const getSuggestionsUsers = (suggestions: string | null) => {
  if (!suggestions) return [];

  return suggestions.split(',');
};

export const appendUser = (currentUsers: string, user: string) => {
  if (!currentUsers) {
    return user;
  }

  const normalizedUser = user.toLowerCase();
  let newUsers = currentUsers;

  if (!newUsers?.includes(normalizedUser)) {
    newUsers += (newUsers === '' ? '' : ',') + normalizedUser;
    newUsers = newUsers.replace(/,$/, '');
  }

  return newUsers;
};
