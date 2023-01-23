import { Injectable } from '@nestjs/common';
import {
  InjectModel,
  // InjectConnection
} from '@nestjs/mongoose';
import {
  Model,
  // Connection,
  // HydratedDocument,
  // QueryWithHelpers
} from 'mongoose';

import { Book, BookDocument } from './schemas/book.schema';
import { CreateBookDto } from './interfaces/dto/create-book';
import { UpdateBookDto } from './interfaces/dto/update-book';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private BookModel: Model<BookDocument>) {}
  // @InjectConnection() private connection: Connection, // Где и зачем используется?

  // В большинстве ручек не могу реализовать .select('-__v'), надо поразбираться будет в дипломной работе
  // TODO: Также разобраться как красиво обработать ситуации ненайденной книги и тд и отдать нужный хттп-код. А то он мне в данный момент возвращает статус 200 при несуществующем айдишнике и отдает ничего. При белеберде вместо айдишника - пятисотит, тут красава. Но лучше бы и эту ситуацию перехватывать и в обоих случаях писать, что нет такой книги.

  // Добавить книгу
  // TODO: хочу, чтобы информировал почему пятисотит, если не хватает обязательных полей или не соответствуют типы данных
  // И, кстати, что за прикол с автоматическим преобразованием намбера в строку? Мне не нравится такое поведение. Написано же, что тайтл должен быть строкой, давай без самодеятельности. Пока выглядит так, что лучше использовать req и res, о тогда это не нестовый подход и теряются его преимущества. Должен быть какой-то другой способ, я так понимаю.
  public async create(data: CreateBookDto): Promise<BookDocument> {
    const book = new this.BookModel(data);
    return book.save();
  }

  // Запросить все книги
  public async findAll(): Promise<BookDocument[]> {
    return this.BookModel.find().exec();
  }

  // Запросить книгу по названию
  // Вообще по-хорошему вот так сделать с id: import { isValidObjectId, Types } from 'mongoose'; -> Types.ObjectId
  public async findOne(id: string): Promise<BookDocument> {
    return this.BookModel.findById(id);
  }

  // Удалить книгу по названию
  public async delete(id: string): Promise<BookDocument> {
    return this.BookModel.findOneAndRemove({ _id: id }).select('-__v');
    // или еще проще:
    // return this.BookModel.findByIdAndRemove(id);
  }

  // Редактировать книгу по названию
  public async update(id: string, data: UpdateBookDto): Promise<BookDocument> {
    const book = await this.BookModel.findOneAndUpdate({ _id: id }, data);
    // Блин, да как сделать-то, чтобы он мне уже апдейтнутую версию тут возвращал? Может редиректом? Эвэйт не помог. Вероятно эти обёртки тут вообще не нужны, надо будет поразбираться, может они уже где-то в декораторах зашиты
    return book;
    // или еще проще:
    // return this.BookModel.findByIdAndUpdate(id, data, { new: true });
  }
}

/*
Зачем в возвращаемом типе delete и update вот это всё?:
QueryWithHelpers<HydratedDocument<BookDocument, {}, {}> | null, HydratedDocument<BookDocument, {}, {}>, {}, BookDocument>
Депрекейтед, к тому же
*/
