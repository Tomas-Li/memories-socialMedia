//External imports
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

//Actions
import { getPosts } from '../../actions/posts';

//UI
import { Pagination, PaginationItem } from '@mui/material'

//styles
import { style } from './style';

const Paginate = ({ page }) => {
  //hooks:
  const dispatch = useDispatch();

  const { numberOfPages } = useSelector((state) => state.posts);

  useEffect(() => {
    if(page) dispatch(getPosts(page));
  }, [page])

  return (
    <Pagination
      sx={{ul: style.ul}}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
      )}
    />
  )
}

export default Paginate