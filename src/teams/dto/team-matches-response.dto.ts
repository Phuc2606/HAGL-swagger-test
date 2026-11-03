import { ApiProperty } from '@nestjs/swagger';
import { MatchResponseDto } from './match-repsonse.dto.js';

export class TeamMatchesResponseDto {
  @ApiProperty({ example: 'HAGL' })
  team!: string;

  @ApiProperty({
    type: [MatchResponseDto],
  })
  matches!: MatchResponseDto[];
}