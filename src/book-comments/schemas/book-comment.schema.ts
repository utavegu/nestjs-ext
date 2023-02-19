import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class BookComment {
  @Prop({ required: true })
  public id: number;

  @Prop({ required: true })
  public bookId: number;

  @Prop({ required: true })
  public comment: string;
}

export type BookCommentDocument = BookComment & Document;

export const BookSchema = SchemaFactory.createForClass(BookComment);
