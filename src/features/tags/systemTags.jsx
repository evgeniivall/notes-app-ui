import { CalendarIcon, StarFilledIcon } from '../../icons/icons';
import { formatDateToDayMonth } from '../../utils/helpers';

export const getStarTag = () => {
  return {
    style: 'wired',
    icon: <StarFilledIcon style={{ fill: '#fecf42' }} />,
    width: 40,
  };
};

export const getDateTag = (date) => {
  return {
    style: 'wired',
    name: formatDateToDayMonth(new Date(date)),
    icon: <CalendarIcon />,
    width: 80,
  };
};
