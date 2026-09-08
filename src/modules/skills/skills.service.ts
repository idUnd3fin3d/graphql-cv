import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service.js';

@Injectable()
export class SkillsService {

  constructor(private readonly prisma: PrismaService) {}

  findByProfileId(profileId: string) {
    // return this.prisma.profile.findFirst({
    //   where: { id: profileId },
    //   select: { skills: true }
    // }).then(result => result?.skills)
    return this.prisma.skill.findMany({
      where: { profiles: { some: { id: profileId } } }
    });
  }
}
