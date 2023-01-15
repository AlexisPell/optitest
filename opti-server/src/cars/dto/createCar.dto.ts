import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';
import { Expose, Transform } from 'class-transformer';

export class CreateCarDto {
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
}

export class CreateCarDtoResult {
  @ApiProperty({ name: 'id' })
  @Expose({ name: 'id' })
  @Transform(({ value }) => String(value), { toPlainOnly: true })
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

  constructor(car: Partial<CreateCarDtoResult>) {
    Object.assign(this, car);
  }
}
