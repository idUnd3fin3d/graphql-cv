import { Args, Query, Resolver } from '@nestjs/graphql';
import { Project } from './projects.model.js';
import { ProjectsService } from './projects.service.js';

@Resolver(() => Project)
export class ProjectsResolver {

  constructor(
    private readonly projectsService: ProjectsService,
  ) {}

  @Query(() => [Project])
  projects(@Args('profileId') profileId: string) {
    return this.projectsService.findByProfileId(profileId);
  }
}
