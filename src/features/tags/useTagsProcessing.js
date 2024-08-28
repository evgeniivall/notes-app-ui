import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTagStyles } from './tagsSlice';

const useTagProcessing = () => {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.tags.tags);

  useEffect(() => {
    tags.forEach((tag) => {
      if (!tag.width) {
        dispatch(fetchTagStyles(tag.name));
      }
    });
  }, [dispatch, tags]);
};

export default useTagProcessing;
