import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';
import { Expose, Transform } from 'class-transformer';

export class GetAllCarsDtoResult {
  @ApiProperty({ name: 'id' })
  @Expose({ name: 'id' })
  @Transform(({ value }) => String(value))
  _id: string;

  @ApiProperty()
  @IsString()
  brand: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsInt()
  yearCreated: number;

  @ApiProperty()
  @IsInt()
  price: number;

  constructor(car: Partial<GetAllCarsDtoResult>) {
    Object.assign(this, car);
  }
}
