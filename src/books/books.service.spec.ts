import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { Book, BookDocument } from './schemas/book.schema';
import {
  mockBook,
  mockId,
  mockCreateBookDto,
  mockUpdateBookDto,
} from './mocks/books.mock';

describe('book service', () => {
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getModelToken(Book.name),
          useValue: Model<BookDocument>,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  test('Добавить книгу в библиотеку', async () => {
    jest
      .spyOn(service, 'create')
      .mockImplementation(async () => mockCreateBookDto);
    expect(await service.create(mockCreateBookDto)).toEqual(mockCreateBookDto);
  });

  test('Получить массив всех книг', async () => {
    jest
      .spyOn(service, 'findAll')
      .mockImplementation(async () => [mockBook, mockBook, mockBook]);
    expect(await service.findAll()).toEqual([mockBook, mockBook, mockBook]);
  });

  test('Получить целевую книгу', async () => {
    jest.spyOn(service, 'findOne').mockImplementation(async () => mockBook);
    expect(await service.findOne(mockId)).toEqual(mockBook);
  });

  test('Удалить целевую книгу', async () => {
    jest.spyOn(service, 'delete').mockImplementation(async () => mockBook);
    expect(await service.delete(mockId)).toEqual(mockBook);
  });

  test('Редактировать целевую книгу', async () => {
    jest
      .spyOn(service, 'update')
      .mockImplementation(async () => mockUpdateBookDto);
    expect(await service.update(mockId, mockUpdateBookDto)).toEqual(
      mockUpdateBookDto,
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
