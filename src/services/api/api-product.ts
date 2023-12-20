/*
* login
 * form-data
 * @param {oc_code} */
import type { ApiResponse } from './types'
import coreApi from './core-api'
import { APIs, APIsTungCon } from './api-config'
import { handleError } from './error'


export interface IParamsHealthy {
    category_id ?: number,
    branch_id ?: number
}

export const getProduct: (
    params: IParamsHealthy
) => Promise<ApiResponse<any>> = async params => {
    const {
        category_id,
        branch_id
    } = params
    try {
        const params = {
            category_id: category_id,
            branch_id: branch_id
           
        };
        const result = await coreApi().get(APIsTungCon.GET_PRO, { params })
        const { data } = result
        return {
            success: true,
            data,
        }
    } catch (error) {
        return handleError(error)
    }
}

export const getCategory: (
    
) => Promise<ApiResponse<any>> = async () => {

    try {
    
        const result = await coreApi().get(APIsTungCon.GET_BRANCH)
        const { data } = result
        return {
            success: true,
            data,
        }
    } catch (error) {
        return handleError(error)
    }
}
