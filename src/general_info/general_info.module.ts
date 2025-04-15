import { Module } from '@nestjs/common';
import { GeneralInfoService } from './general_info.service';
import { GeneralInfoController } from './general_info.controller';

@Module({
  controllers: [GeneralInfoController],
  providers: [GeneralInfoService],
})
export class GeneralInfoModule {}
