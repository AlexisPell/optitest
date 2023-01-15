import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type CarDocument = Car & Document;

@Schema({ versionKey: false, timestamps: true })
export class Car {
  @ApiProperty({ description: 'car brand' })
  @Prop({ required: true })
  brand: string;

  @ApiProperty({ description: 'car name' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'car year release' })
  @Prop({ required: true })
  yearCreated: number;

  @ApiProperty({ description: "car's price" })
  @Prop({ required: true })
  price: number;
}

export const CarSchema = SchemaFactory.createForClass(Car);
