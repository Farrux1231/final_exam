import { Injectable } from '@nestjs/common';
import { CreateMasterProfessionDto } from './dto/create-master-profession.dto';
import { UpdateMasterProfessionDto } from './dto/update-master-profession.dto';

@Injectable()
export class MasterProfessionService {
  create(createMasterProfessionDto: CreateMasterProfessionDto) {
    return 'This action adds a new masterProfession';
  }

  findAll() {
    return `This action returns all masterProfession`;
  }

  findOne(id: number) {
    return `This action returns a #${id} masterProfession`;
  }

  update(id: number, updateMasterProfessionDto: UpdateMasterProfessionDto) {
    return `This action updates a #${id} masterProfession`;
  }

  remove(id: number) {
    return `This action removes a #${id} masterProfession`;
  }
}
