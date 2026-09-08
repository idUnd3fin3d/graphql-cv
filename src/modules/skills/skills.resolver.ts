import { Args, Query, Resolver } from '@nestjs/graphql';
import { Skill } from './skills.model.js';
import { SkillsService } from './skills.service.js';

@Resolver(() => Skill)
export class SkillsResolver {

  constructor(
    private readonly skillsService: SkillsService,
  ) {}

  @Query(() => [Skill])
  skills(@Args('profileId') profileId: string) {
    return this.skillsService.findByProfileId(profileId);
  }
}
