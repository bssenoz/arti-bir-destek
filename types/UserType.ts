export type PatientType = {
    id: number | null;
    name: string;
    surname: string;
    email: string;
    phoneNumber: string | null;
    password: string;
    confirmPassword: string;
    pregnancyStartDate: string;
};

export type DoctorType = {
    id: number | null;
    name: string;
    surname: string;
    email: string;
    phoneNumber: string | null;
    title: string;
    password: string;
    confirmPassword: string;
};
