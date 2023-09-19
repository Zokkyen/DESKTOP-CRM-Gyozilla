import instance from "../interceptor"

export const updateStocktById = async (values,id)=>{
    return await instance.patch(`stock/${id}`, values);
}