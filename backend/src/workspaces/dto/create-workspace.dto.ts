import { ApiProperty } from "@nestjs/swagger";

export class CreateWorkspaceDto {
  @ApiProperty({
    example: 'c-mind',
    description: 'the name of workspace'
  })
  public workspace: string;
  
  @ApiProperty({
    example: 'cmind',
    description: 'url address'
  })
  public url: string;
}