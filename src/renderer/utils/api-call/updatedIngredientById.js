import instance from "../interceptor"

export const updatedIngredientById = async (values,id)=>{
    console.log('function',values, id);
    return await instance.patch(`ingredients/${id}`, values);
}