import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Profile } from './profiles.model.js';
import { Skill } from '../skills/skills.model.js';
import { Project } from '../projects/projects.model.js';
import { Experience } from '../experiences/experiences.model.js';
import { ProfilesService } from './profiles.service.js';
import { SkillsService } from '../skills/skills.service.js';
import { ProjectsService } from '../projects/projects.service.js';
import { ExperiencesService } from '../experiences/experiences.service.js';

@Resolver(() => Profile)
export class ProfilesResolver {

  constructor(
    private readonly profileService: ProfilesService,
    private readonly skillsService: SkillsService,
    private readonly projectsService: ProjectsService,
    private readonly experienceService: ExperiencesService,
  ) {}

  @Query(() => [Profile])
  profiles(@Args('offset', { defaultValue: 0 }) offset: number, @Args('limit', { defaultValue: 10 }) limit: number) {
    return this.profileService.findAll(offset, limit);
  }

  @Query(() => Profile, { nullable: true })
  profile(@Args('id') id: string) {
    return this.profileService.findById(id);
  }

  @ResolveField(() => [Skill])
  skills(@Parent() profile: Profile) {
    return this.skillsService.findByProfileId(profile.id);
  }

  @ResolveField(() => [Project])
  projects(@Parent() profile: Profile) {
    return this.projectsService.findByProfileId(profile.id);
  }

  @ResolveField(() => [Experience])
  experience(@Parent() profile: Profile) {
    return this.experienceService.findByProfileId(profile.id);
  }
}
