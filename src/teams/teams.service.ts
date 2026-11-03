import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class TeamsService {
  constructor(private readonly prisma: PrismaService) {}

  // API 1: Get HAGL information
  async getHaglTeam() {
    const team = await this.prisma.team.findUnique({
      where: {
        shortName: 'HAGL',
      },
    });

    if (!team) {
      throw new NotFoundException('HAGL team not found');
    }

    return team;
  }

  // API 2: Get HAGL matches
  async getHaglMatches() {
    const team = await this.prisma.team.findUnique({
      where: {
        shortName: 'HAGL',
      },
      include: {
        matches: {
          orderBy: {
            matchDate: 'asc',
          },
        },
      },
    });

    if (!team) {
      throw new NotFoundException('HAGL team not found');
    }

    return {
      team: team.shortName,
      matches: team.matches,
    };
  }
}