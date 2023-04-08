import { Controller, Delete, HttpCode, Param, UseGuards } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role, Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';

@UseGuards(AuthGuard)
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentService: AppointmentsService) { }

  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @HttpCode(204)
  remove(@Param('id') id: string): Promise<void> {
    const parsedId = parseInt(id, 10);
    return this.appointmentService.remove(parsedId);
  }
}
