export default interface BaseResponse<T> {
  status_code: number,
  message: string,
  data?: T,
};
