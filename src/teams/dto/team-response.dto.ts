import { ApiProperty } from '@nestjs/swagger';

export class TeamResponseDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'Hoàng Anh Gia Lai' })
  name!: string;

  @ApiProperty({ example: 'HAGL' })
  shortName!: string;

  @ApiProperty({ example: 'Pleiku Stadium' })
  stadium!: string;

  @ApiProperty({ example: 2001 })
  foundedYear!: number;
}