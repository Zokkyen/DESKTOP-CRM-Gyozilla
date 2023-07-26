import instance from "utils/interceptor"

export const getAllIngedients = async ()=>{
    return await instance.get('products');
}