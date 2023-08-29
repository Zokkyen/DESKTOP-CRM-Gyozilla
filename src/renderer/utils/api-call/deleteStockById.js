import instance from "../interceptor"

export const deleteStockById = async (id)=>{
    return await instance.delete(`stock/${id}`);
}