export const formatDate = (date: string) => {
  return new Intl.DateTimeFormat('en-GB').format(new Date(date));
};

export const getSuggestionsUsers = (suggestions: string | null) => {
  if (!suggestions) return [];

  return suggestions.split(',');
};
