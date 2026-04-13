import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchTagStyles } from './tagsSlice';

const useTagProcessing = (): void => {
  const dispatch = useAppDispatch();
  const tags = useAppSelector((state) => state.tags.tags);

  useEffect(() => {
    tags.forEach((tag) => {
      if (!tag.width) {
        dispatch(fetchTagStyles(tag.name));
      }
    });
  }, [dispatch, tags]);
};

export default useTagProcessing;
