// helper functions
//import url from './URL'

export const flattenProducts = (data)=>{
  return data.map(item=>{
    //claudinary
    let image = item.image.url;
    
    // develoment server
    //let image = `${url}${item.image.url}`; 
    return {...item , image};
  })
}



export const filterForFeaturedProducts = (products) =>{
  return products.filter(product => {
    return product.featured === true;
  })
};


