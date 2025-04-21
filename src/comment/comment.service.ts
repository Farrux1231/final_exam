import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCommentDto: CreateCommentDto) {
    const { message, orderId, master_ratings } = createCommentDto;

    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    const comment = await this.prisma.comment.create({
      data: {
        message,
        orderId,
      },
    });

    if (master_ratings && master_ratings.length > 0) {
      await Promise.all(
        master_ratings.map((rating) =>
          this.prisma.master_rating.create({
            data: {
              star: rating.star,
              masterId: rating.masterId,
              commentId: comment.id, 
            },
          }),
        ),
      );
    }

    const fullComment = await this.prisma.comment.findUnique({
      where: { id: comment.id },
      include: { master_rating: true },
    });

    return fullComment;
  }

  async findAll() {
    const comments = await this.prisma.comment.findMany({
      include: { master_rating: true },
    });
    return comments;
  }

  async remove(id: number) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
      include: { master_rating: true },
    });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    let deletedMaster = await this.prisma.master_rating.deleteMany({
      where: { commentId: id },
    });

    await this.prisma.comment.delete({
      where: { id },
    });

    return {deletedMaster};
  }
}

