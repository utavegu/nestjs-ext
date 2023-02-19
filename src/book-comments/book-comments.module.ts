import { Module } from '@nestjs/common';
import { BookCommentsService } from './book-comments.service';

@Module({
  providers: [BookCommentsService],
})
export class BookCommentsModule {}
