export const getNextWednesdayOrThursday = () => {
  const today = new Date();
  const currentDay = today.getDay(); // 0 is Sunday, 1 is Monday, etc.

  const getNextDay = (targetDay: number) => {
    const daysUntilTarget = (targetDay - currentDay + 7) % 7 || 7;
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + daysUntilTarget);
    return nextDate.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formattedWednesday = getNextDay(3); // 3 is Wednesday
  const formattedThursday = getNextDay(4); // 4 is Thursday

  return { formattedWednesday, formattedThursday };
};
