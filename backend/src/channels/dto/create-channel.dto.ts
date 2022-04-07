import { ApiProperty } from "@nestjs/swagger";

export class CreateChannelDto {
  
  @ApiProperty({
    example: 'si-department',
    description: 'channel name'
  })
  public name: string;

}