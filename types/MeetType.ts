export type MeetType = {
    id: number;
    name: string;
    date: string;
    time: string;
    url: string;
};

export type MakeAppointmentType = {
    doctorId: string;
    day: string;
    timeRange: number;
}

export type AppointmentReportType = {
    appointmentStartTime: string;
    appointmentEndTime: string;
    appointmentComment: string,
    appointmentScheduleId: number;
    patientId: string;
}