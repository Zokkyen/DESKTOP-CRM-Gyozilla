import instance from "../interceptor"

export const getStockByFranchise = async (franchiseId)=>{
    return await instance.get(`stock/franchise/${franchiseId}`);
}