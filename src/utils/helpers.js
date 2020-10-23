// helper functions

export const flattenProducts = (data)=>{
  return data.map(item=>{
    //claudinary
    let image = (item.image && item.image.url) || null;
    
    return {...item , image};
  })
}

export const filterForFeaturedProducts = (products) =>{
  return products.filter(product => {
    return product.featured === true;
  })
};


