import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeleteCarDto {
  @ApiProperty()
  @IsString()
  id: string;
}
