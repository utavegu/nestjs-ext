/* eslint-disable prettier/prettier */
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';
import { BookCommentsService } from './book-comments.service';
import { BookCommentDto } from './dto/book-comment.dto';
import { IBookComment } from './interfaces/book-comment.interface';

@WebSocketGateway({ cors: true })
export class BookCommentsGateway {
  constructor(private bookCommentsService: BookCommentsService) {}

  @SubscribeMessage('add-comment')
  async addComment(@MessageBody() body: BookCommentDto): Promise<WsResponse> {
    const newComment = await this.bookCommentsService.createBookComment(body);
    return {
      event: 'newCommentFromServer',
      data: newComment,
    }
  }

  @SubscribeMessage('get-all-comments')
  async getAllComments(@MessageBody() body: IBookComment['bookId']): Promise<IBookComment[]> {
    return await this.bookCommentsService.findAllBookComments(body);
  }
}
