import { CalendarIcon } from '../../icons/icons';
import { formatDateToDayMonth } from '../../utils/helpers';

export const getDateTag = (date) => {
  return {
    style: 'wired',
    name: formatDateToDayMonth(new Date(date)),
    icon: <CalendarIcon />,
    width: 80,
  };
};
