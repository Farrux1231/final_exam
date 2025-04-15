import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GeneralInfoModule } from './general_info/general_info.module';
import { ContactModule } from './contact/contact.module';
import { FaqModule } from './faq/faq.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [GeneralInfoModule, ContactModule, FaqModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
