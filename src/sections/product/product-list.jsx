import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { paths } from 'src/routes/paths';

import { ProductItem } from './product-item';
import { ProductItemSkeleton } from './product-skeleton';

// ----------------------------------------------------------------------

export function ProductList({ products, loading, sx, ...other }) {
  const renderLoading = () => <ProductItemSkeleton />;

  console.log('ProductList', products);
  
  const renderList = () =>
    products.map((product) => (
      <ProductItem
        key={product.product_id}
        product={product}
        detailsHref={paths.product.details(product.product_id)}
      />
      
    ));

    

  return (
    <>
      <Box
        sx={[
          () => ({
            gap: 3,
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...other}
      >
        {loading ? renderLoading() : renderList()}
      </Box>

      {products.length > 8 && (
        <Pagination
          count={8}
          sx={{
            mt: { xs: 5, md: 8 },
            [`& .${paginationClasses.ul}`]: { justifyContent: 'center' },
          }}
        />
      )}
    </>
  );
}
