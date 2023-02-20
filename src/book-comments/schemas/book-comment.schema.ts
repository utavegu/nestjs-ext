import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class BookComment {
  @Prop({ required: false })
  public id: string;

  @Prop({ required: true })
  public bookId: string;

  @Prop({ required: true })
  public comment: string;
}

export type BookCommentDocument = BookComment & Document;

export const BookCommentSchema = SchemaFactory.createForClass(BookComment);
