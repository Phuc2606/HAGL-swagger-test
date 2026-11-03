import { Controller, Get } from '@nestjs/common';

import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

import { TeamsService } from './teams.service.js';

import { TeamResponseDto } from './dto/team-response.dto.js';
import { TeamMatchesResponseDto } from './dto/team-matches-response.dto.js';

@ApiTags('Teams')
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get('hagl')
  @ApiOperation({
    summary: 'Get HAGL club information',
  })
  @ApiOkResponse({
    description: 'Successfully retrieved HAGL information',
    type: TeamResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'HAGL team not found',
  })
  async getHaglTeam() {
    return this.teamsService.getHaglTeam();
  }

  @Get('hagl/matches')
  @ApiOperation({
    summary: 'Get HAGL match schedule and results',
  })
  @ApiOkResponse({
    description: 'Successfully retrieved HAGL matches',
    type: TeamMatchesResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'HAGL team not found',
  })
  async getHaglMatches() {
    return this.teamsService.getHaglMatches();
  }
}