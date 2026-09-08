import { Module } from '@nestjs/common';
import { ProfilesResolver } from './profiles.resolver.js';
import { ProfilesService } from './profiles.service.js';
import { ExperiencesModule } from '../experiences/experiences.module.js';
import { ProjectsModule } from '../projects/projects.module.js';
import { SkillsModule } from '../skills/skills.module.js';

@Module({
  imports: [ExperiencesModule, SkillsModule, ProjectsModule],
  providers: [ProfilesService, ProfilesResolver]
})
export class ProfilesModule {}
