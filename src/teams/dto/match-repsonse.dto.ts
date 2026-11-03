import { ApiProperty } from '@nestjs/swagger';

export class MatchResponseDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'Hà Nội FC' })
  opponent!: string;

  @ApiProperty({
    example: '2026-11-15T12:00:00.000Z',
  })
  matchDate!: Date;

  @ApiProperty({ example: 'V.League 1' })
  competition!: string;

  @ApiProperty({
    example: 'SCHEDULED',
    enum: ['SCHEDULED', 'LIVE', 'COMPLETED'],
  })
  status!: string;

  @ApiProperty({ example: true })
  isHome!: boolean;

  @ApiProperty({ example: null, nullable: true })
  teamScore!: number | null;

  @ApiProperty({ example: null, nullable: true })
  opponentScore!: number | null;
}