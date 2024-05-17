export type PatientType = {
    id: string;
    name: string;
    surname: string;
    email: string;
    profileImageUrl: string | null;
    phoneNumber: string | null;
    password: string;
    confirmPassword: string;
};

export type DoctorType = {
    id: string;
    name: string;
    surname: string;
    email: string;
    profileImageUrl: string | null;
    phoneNumber: string | null;
    title: string;
    password: string;
    confirmPassword: string;
};

export type CurrentUserType = {
    id: string;
    name: string;
    surname: string;
    email: string;
    phoneNumber: string | null;
    profileImageUrl: string | null;
    title:string | null;
} 

export type DoctorIdType = {
    doctorId: string;
} 

export type ChangePassword = {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export type UpdateDoctor = {
    name: string | null;
    surname: string | null;
    phoneNumber: string | null;
    title: string | null;
}

export type UpdatePatient = {
    name: string | null;
    surname: string | null;
    phoneNumber: string | null;
}