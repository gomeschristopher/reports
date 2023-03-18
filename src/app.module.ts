import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './reports/report.entity';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3308,
      username: "root",
      password: "admin",
      database: "report",
      entities: [Report],
      synchronize: true
    }),
    ReportsModule
  ],
})
export class AppModule {}
