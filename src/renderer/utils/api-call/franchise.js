/* eslint-disable import/prefer-default-export */
import instance from '../interceptor';

export const getAllFranchises = () => {
  return instance.get('franchises');
};
