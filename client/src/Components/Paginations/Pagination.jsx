//External imports
import React from 'react';
import { Link } from 'react-router-dom';
import { Pagination, PaginationItem } from '@mui/material'

//styles
import { style } from './style';

const Paginate = () => {
  return (
    <Pagination
      sx={style.ul}
      count={5}
      page={1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${1}`} />
      )}
    />
  )
}

export default Paginate