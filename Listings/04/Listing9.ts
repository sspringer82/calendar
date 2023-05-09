import { IsNumberString } from 'class-validator';

class NumberParameter {
  @IsNumberString()
  id: string;
}

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('appointments')
export class AppointmentsController {
  @ApiOperation({ summary: 'Fetch one appointment' })
  @ApiResponse({
    status: 200,
    description: 'The requested appointment',
    type: Appointment,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
  })
  @ApiParam({
    name: 'id',
    description: 'The id of the appointment',
    required: true,
    type: String,
    example: 1,
  })
  @Get(':id')
  getOne(
    @Param() { id }: NumberParameter,
    @Request() request: RequestType,
  ): Promise<Appointment> {
    const parsedId = parseInt(id, 10);
    return this.appointmentService.getOne(parsedId, request.user.sub);
  }
}
