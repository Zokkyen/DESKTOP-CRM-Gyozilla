import instance from "../interceptor"

export const deleteStockById = async (id)=>{
    console.log('function',values, id);
    return await instance.deltee(`stock/${id}`);
}