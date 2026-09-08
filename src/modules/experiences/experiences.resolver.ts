import { Args, Query, Resolver } from '@nestjs/graphql';
import { Experience } from './experiences.model.js';
import { ExperiencesService } from './experiences.service.js';

@Resolver(() => Experience)
export class ExperiencesResolver {

  constructor(
    private readonly experienceService: ExperiencesService,
  ) {}

  @Query(() => [Experience])
  experiences(@Args('profileId') profileId: string) {
    return this.experienceService.findByProfileId(profileId);
  }
}
