import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Book {
  @Prop({ required: true })
  public title: string;

  @Prop({ required: true })
  public description: string;

  @Prop({ required: true })
  public authors: string[];

  @Prop()
  public favorite: string;

  @Prop()
  public fileCover: string;

  @Prop()
  public fileName: string;

  @Prop()
  public fileBook: string;
}

export type BookDocument = Book & Document;

export const BookSchema = SchemaFactory.createForClass(Book);
