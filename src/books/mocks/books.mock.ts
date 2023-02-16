// с эни я тут конечно... неплохо бы нормально сделать

const mockId = '63ce577c4ae871832103a9c3';

const mockBook: any = {
  title: 'Заголовок',
  description: 'Описание',
  authors: ['Человек 1', 'Человек 2'],
};

const mockCreateBookDto: any = {
  title: 'Новый заголовок книги',
  description: 'Свежее описание',
  authors: ['Новый человек', 'Созданный человек'],
};

const mockUpdateBookDto: any = {
  title: 'Другой заголовок',
  description: 'Не то описание',
  authors: [
    'Измененный человек 1',
    'Замененный человек 2',
    'Добавленный человек 3',
  ],
};

export { mockBook, mockCreateBookDto, mockUpdateBookDto, mockId };
