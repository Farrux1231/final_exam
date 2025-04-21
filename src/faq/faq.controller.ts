import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FaqService } from './faq.service';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decoration/user.decoration';
import { Role } from 'Role/user.role';

@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createFaqDto: CreateFaqDto) {
    return this.faqService.create(createFaqDto);
  }

  @Roles(Role.SUPER_ADMIN)
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.faqService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.faqService.findOne(+id);
  }

  @Roles(Role.SUPER_ADMIN)
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFaqDto: UpdateFaqDto) {
    return this.faqService.update(+id, updateFaqDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.faqService.remove(+id);
  }
}
