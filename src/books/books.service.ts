import { Injectable } from '@nestjs/common';

import { IBook } from './interfaces/book.interface';

// 1) Пока что криейту и апдейту пофиг на обязательные поля, но Монга потом разрулит.
// 2) Вообще то, что у меня тут нет отдельного поля айди - плохая практика. Но оставляю, опять-таки, на откуп Монги, которая подъедет в следующем задании
// 3) Фокусы со спредом тоже кхэ. Но я так понимаю, смысл этого задания именно архитектуру Неста обкатать, потому оставлю пока так до подключения Монги

@Injectable()
export class BooksService {
  private readonly books: IBook[] = [];

  // Добавить книгу
  create(book: IBook) {
    this.books.push(book);
    return book;
  }

  // Запросить все книги
  findAll(): IBook[] {
    return this.books;
  }

  // Запросить книгу по названию
  findOne(id: string): IBook {
    return this.books.find((book: IBook) => book.title === id);
  }

  // Удалить книгу по названию
  delete(id: string): IBook[] {
    const targetIndex = this.books.findIndex(
      (book: IBook) => book.title === id,
    );
    if (targetIndex !== -1) {
      this.books.splice(targetIndex, 1);
      return this.books;
    }
  }

  // Редактировать книгу по названию
  update(id: string, book: IBook): IBook {
    const targetIndex = this.books.findIndex(
      (book: IBook) => book.title === id,
    );
    this.books.splice(targetIndex, 1, book);
    return this.books[targetIndex];
  }
}
