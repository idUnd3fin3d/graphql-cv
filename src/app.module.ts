import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PrismaModule } from './database/prisma.module.js';
import { ProfilesModule } from './modules/profiles/profiles.module.js';
import { SkillsModule } from './modules/skills/skills.module.js';
import { ProjectsModule } from './modules/projects/projects.module.js';
import { ExperiencesModule } from './modules/experiences/experiences.module.js';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      graphiql: true,
      introspection: true,
    }),
    PrismaModule,
    ProfilesModule,
    SkillsModule,
    ProjectsModule,
    ExperiencesModule
  ],
})
export class AppModule {}
