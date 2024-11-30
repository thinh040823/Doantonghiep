import React from 'react';

const ProductDescription = ({ description }) => {
  return (
    <div className='description-product' dangerouslySetInnerHTML={{ __html: description }} />
  );
};

export default ProductDescription;
