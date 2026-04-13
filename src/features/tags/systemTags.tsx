import React from 'react';
import { CalendarIcon } from '../../icons/icons';
import { formatDateToDayMonth } from '../../utils/helpers';
import type { Tag } from '../../types';

export const getDateTag = (date: number | Date | string): Tag => {
  return {
    style: 'wired',
    name: formatDateToDayMonth(new Date(date as number)),
    icon: <CalendarIcon />,
    width: 80,
    notes: [],
  };
};
