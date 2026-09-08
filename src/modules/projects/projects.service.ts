import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service.js';

@Injectable()
export class ProjectsService {

  constructor(private readonly prisma: PrismaService) {}

  findByProfileId(profileId: string) {
    return this.prisma.project.findMany({
      where: { profileId }
    });
  }
}
