import { Args, Query, Resolver } from '@nestjs/graphql';
import { Profile } from './profiles.model.js';
import { ProfilesService } from './profiles.service.js';

@Resolver(() => Profile)
export class ProfilesResolver {

  constructor(
    private readonly profileService: ProfilesService,
  ) {}

  @Query(() => [Profile])
  profiles(@Args('offset', { defaultValue: 0 }) offset: number, @Args('limit', { defaultValue: 10 }) limit: number) {
    return this.profileService.findAll(offset, limit);
  }

  @Query(() => Profile, { nullable: true })
  profile(@Args('id') id: string) {
    return this.profileService.findById(id);
  }
}
