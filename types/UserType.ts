export type PatientType = {
    id: number | null;
    name: string;
    surname: string;
    email: string;
    password: string;
    confirmPassword: string;
    pregnancyStartDate: string;
};

export type DoctorType = {
    id: number | null;
    name: string;
    surname: string;
    email: string;
    title: string;
    password: string;
    confirmPassword: string;
};
