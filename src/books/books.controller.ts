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
  Header,
} from '@nestjs/common';
// import { HydratedDocument, QueryWithHelpers } from 'mongoose';
import { BooksService } from './books.service';
import { CreateBookDto } from './interfaces/dto/create-book';
import { UpdateBookDto } from './interfaces/dto/update-book';
import { IParamId } from './interfaces/param-id';
import {
  // BookDocument,
  Book,
} from './schemas/book.schema';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  public create(@Body() body: CreateBookDto): Promise<Book> {
    // Можно и Promise<BookDocument>, разницы не понял
    return this.booksService.create(body);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  public getAllBooks(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public getTargetBook(@Param('id') id: string): Promise<Book> {
    // альтернативный способ извлечения id
    return this.booksService.findOne(id);
  }

  @Delete(':id')
  public delete(@Param() { id }: IParamId): Promise<Book> {
    return this.booksService.delete(id);
  }

  @Put(':id')
  public update(
    @Param() { id }: IParamId,
    @Body() body: UpdateBookDto,
  ): Promise<Book> {
    return this.booksService.update(id, body);
  }
}

/*
Аналогичное переусложнение в Delete и Put:
QueryWithHelpers<HydratedDocument<BookDocument, {}, {}> | null, HydratedDocument<BookDocument, {}, {}>, {}, BookDocument>
*/
