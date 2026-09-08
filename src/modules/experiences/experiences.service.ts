import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service.js';

@Injectable()
export class ExperiencesService {

  constructor(private readonly prisma: PrismaService) {}

  findByProfileId(profileId: string) {
    return this.prisma.experience.findMany({
      where: { profileId }
    });
  }
}
