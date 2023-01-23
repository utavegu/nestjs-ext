import { Module, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { LoggerMiddleware } from './middleware/logger.middleware';
import { BooksModule } from './books/books.module';
import { BooksController } from './books/books.controller';

@Module({
  imports: [
    // ConfigModule.forRoot(), (использую докер-контейнер, не пригодилось, как и дотенв)
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGODB_LOGIN}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_SERVICE_NAME}:${process.env.MONGODB_INTERNAL_PORT}/`,
      {
        dbName: process.env.DB_NAME,
      },
    ),
    BooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(BooksController);
  }
}
