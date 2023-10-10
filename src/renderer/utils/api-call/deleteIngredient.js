import instance from "../interceptor"

export const deleteIngredientById = async (id)=>{
    return await instance.delete(`ingredients/${id}`);
}