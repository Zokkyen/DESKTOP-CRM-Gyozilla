import instance from "../interceptor"

export const createdIngredient = async (values)=>{
    return await instance.post('ingredients', values);
}