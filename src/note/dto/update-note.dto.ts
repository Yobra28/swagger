/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateNoteDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  title?: string;


  @IsOptional()
  @IsString()
  content?: string;
}
