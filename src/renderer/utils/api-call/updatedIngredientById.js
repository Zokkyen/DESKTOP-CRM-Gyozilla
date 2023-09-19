import instance from "../interceptor"

export const updatedIngredientById = async (values,id)=>{
    return await instance.patch(`ingredients/${id}`, values);
}
