import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService]
})
export class PrismaModule {}
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/Farrux1231/final_exam.git