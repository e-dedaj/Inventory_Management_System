import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { TypeOrmModule } from '@nestjs/typeorm'; // 1. Shto këtë import
import { Customer } from '../entities/customer.entity'; // 2. Shto kët me rrugëzimin e saktë te entiteti yt

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer]) // 3. Regjistro tabelën Customer këtu
  ],
  controllers: [CustomersController],
  providers: [CustomersService]
})
export class CustomersModule {}
