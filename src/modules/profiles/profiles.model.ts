import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Experience } from '../experiences/experiences.model.js';
import { Skill } from '../skills/skills.model.js';
import { Project } from '../projects/projects.model.js';

@ObjectType()
export class Profile {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  githubLink?: string;

  @Field({ nullable: true })
  hhLink?: string;

  @Field(() => [Experience])
  experience: Experience[];

  @Field(() => [Skill])
  skills: Skill[];

  @Field(() => [Project])
  projects: Project[];
}
