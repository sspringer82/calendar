@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentService: AppointmentsService) {}

  @ApiOperation({ summary: 'Fetch all appointments' })
  @ApiResponse({
    status: 200,
    description: 'All available appointments for the user',
    type: Appointment,
    isArray: true,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @Get()
  async getAll(@Request() request: RequestType): Promise<Appointment[]> {
    return this.appointmentService.getAll(request.user.sub);
  }
}
