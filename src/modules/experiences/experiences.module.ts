import { Module } from '@nestjs/common';
import { ExperiencesService } from './experiences.service.js';
import { ExperiencesResolver } from './experiences.resolver.js';

@Module({
  providers: [ExperiencesService, ExperiencesResolver],
  exports: [ExperiencesService]
})
export class ExperiencesModule {}
