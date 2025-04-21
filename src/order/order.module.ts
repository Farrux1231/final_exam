import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TgBotService } from 'src/tg_bot/tg_bot.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService, TgBotService],
})
export class OrderModule {}
