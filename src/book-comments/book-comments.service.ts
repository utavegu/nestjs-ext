import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  BookComment,
  BookCommentDocument,
} from './schemas/book-comment.schema';
import { IBookComment } from './interfaces/book-comment.interface';
import { BookCommentDto } from './dto/book-comment.dto';

@Injectable()
export class BookCommentsService {
  constructor(
    @InjectModel(BookComment.name)
    private BookCommentModel: Model<BookCommentDocument>,
  ) {}

  public async createBookComment(
    data: BookCommentDto,
  ): Promise<BookCommentDocument> {
    const bookComment = new this.BookCommentModel(data);
    return await bookComment.save();
  }

  public async findAllBookComments(
    bookId: IBookComment['bookId'],
  ): Promise<BookCommentDocument[]> {
    return await this.BookCommentModel.find({ bookId });
  }

  public async findTargetBookComment(
    id: IBookComment['id'],
  ): Promise<BookCommentDocument> {
    return await this.BookCommentModel.findById(id);
  }

  public async updateTargetBookComment(
    id: IBookComment['id'],
    data: Omit<BookCommentDto, 'bookId'>,
  ): Promise<BookCommentDocument> {
    return await this.BookCommentModel.findByIdAndUpdate(id, data);
  }

  public async deleteTargetBookComment(
    id: IBookComment['id'],
  ): Promise<BookCommentDocument> {
    return await this.BookCommentModel.findByIdAndRemove(id);
  }
}
