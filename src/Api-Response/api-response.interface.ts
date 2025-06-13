/* eslint-disable prettier/prettier */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  note?: T;    
  error?: string;
}