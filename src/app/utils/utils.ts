import { TimeSuggestion } from '@/db/schema';

export const formatDate = (date: string) => {
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
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

export const getUniqueVoters = (suggestions: TimeSuggestion[]) => {
  return suggestions.reduce((voters: string[], suggestion) => {
    const users = getSuggestionsUsers(suggestion.users);
    users.forEach(user => {
      if (!voters.includes(user)) {
        voters.push(user);
      }
    });

    return voters;
  }, []);
};

type SortOrder = 'asc' | 'desc';
export const orderDates = (
  suggestions: TimeSuggestion[],
  sortOrder: SortOrder
) => {
  return suggestions.sort((a, b) => {
    const dateA = new Date(a.time).getTime();
    const dateB = new Date(b.time).getTime();

    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });
};

export const sort = <T extends string | number>(
  array: T[],
  sortOrder: SortOrder
) => {
  return array.sort((a, b) => {
    return sortOrder === 'asc' ? (a < b ? -1 : 1) : a < b ? 1 : -1;
  });
};
