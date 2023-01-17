import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

// ЕЩЕ МИДЛВАРУ 404 САМ ПОВТОРИ! Если ее тут автоматом нет

import { BooksService } from './books.service';
import { IBook } from './interfaces/book.interface';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() book: IBook): IBook {
    return this.booksService.create(book);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllBooks() {
    return this.booksService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getTargetBook(@Param('id') id: string): IBook {
    return this.booksService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteTargetBook(@Param('id') id: string): IBook[] {
    return this.booksService.delete(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() book: IBook): IBook {
    return this.booksService.update(id, book);
  }
}
