import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service.js';

@Injectable()
export class ProfilesService {

  constructor(private readonly prisma: PrismaService) {}

  findAll(offset: number, limit: number) {
    return this.prisma.profile.findMany({
      skip: offset,
      take: limit,
    });
  }

  findById(id: string) {
    return this.prisma.profile.findFirst({
      where: { id },
    });
  }
}
