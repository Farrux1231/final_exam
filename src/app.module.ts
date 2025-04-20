import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GeneralInfoModule } from './general_info/general_info.module';
import { ContactModule } from './contact/contact.module';
import { FaqModule } from './faq/faq.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { RegionModule } from './region/region.module';
import { LevelModule } from './level/level.module';
import { CommentModule } from './comment/comment.module';
import { SizeModule } from './size/size.module';
import { BrandModule } from './brand/brand.module';
import { PowerModule } from './power/power.module';
import { MasterModule } from './master/master.module';
import { ProfessionLevelModule } from './profession-level/profession-level.module';
import { ProfessionModule } from './profession/profession.module';
import { ToolsModule } from './tools/tools.module';
import { OrderModule } from './order/order.module';
import { BasketModule } from './basket/basket.module';

@Module({
  imports: [GeneralInfoModule, ContactModule, FaqModule, PrismaModule, UserModule, RegionModule, LevelModule, CommentModule, SizeModule, BrandModule, PowerModule, MasterModule, ProfessionLevelModule, ProfessionModule, ToolsModule, OrderModule, BasketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
