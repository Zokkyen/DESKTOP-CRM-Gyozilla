import instance from "../interceptor"

export const getAllIngredients = async ()=>{
    return await instance.get('ingredients');
}