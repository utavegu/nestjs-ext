/* eslint-disable @typescript-eslint/no-unused-vars */
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import {
  mockBook,
  mockCreateBookDto,
  mockId,
  mockUpdateBookDto,
} from './mocks/books.mock';

describe('Books', () => {
  let app: INestApplication;
  const booksService = {
    create: jest.fn((_body) => mockCreateBookDto),
    findAll: jest.fn(() => [mockBook, mockBook, mockBook]),
    findOne: jest.fn((_id) => mockBook),
    delete: jest.fn((_id) => mockBook),
    update: jest.fn((_id, _body) => mockUpdateBookDto),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService],
    })
      .overrideProvider(BooksService)
      .useValue(booksService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/books (GET)`, () => {
    return request(app.getHttpServer())
      .get('/books')
      .expect(200)
      .expect(booksService.findAll());
  });

  it(`/books/:id (GET)`, () => {
    return request(app.getHttpServer())
      .get(`/books/${mockId}`)
      .expect(200)
      .expect(booksService.findOne(mockId));
  });

  it(`/books (POST)`, () => {
    return request(app.getHttpServer())
      .post('/books')
      .expect(201)
      .expect(booksService.create(mockCreateBookDto));
  });

  it(`/books/:id (DELETE)`, () => {
    return request(app.getHttpServer())
      .delete(`/books/${mockId}`)
      .expect(200)
      .expect(booksService.delete(mockId));
  });

  it(`/books/:id (PUT)`, () => {
    return request(app.getHttpServer())
      .put(`/books/${mockId}`)
      .expect(200)
      .expect(booksService.update(mockId, mockUpdateBookDto));
  });

  afterAll(async () => {
    await app.close();
  });
});
