export function getPlaceHolder(width, height) {
  let baseURL = "https://picsum.photos/";
  if (width === undefined && height === undefined) {
    return baseURL+"480/320";
  } else if(width !== undefined &&height === undefined){
    return baseURL + width ;
  }else{
    return baseURL + width + "/" + height;
  }
}
