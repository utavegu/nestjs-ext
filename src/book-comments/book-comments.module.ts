import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookCommentsService } from './book-comments.service';
import { BookCommentsGateway } from './book-comments.gateway';
import { BookComment, BookCommentSchema } from './schemas/book-comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: BookComment.name,
        schema: BookCommentSchema,
      },
    ]),
  ],
  providers: [BookCommentsService, BookCommentsGateway],
})
export class BookCommentsModule {}
