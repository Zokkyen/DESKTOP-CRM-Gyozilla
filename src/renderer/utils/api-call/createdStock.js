import instance from "../interceptor"

export const createdStock = async (values)=>{
    return await instance.post('stock', values);
}