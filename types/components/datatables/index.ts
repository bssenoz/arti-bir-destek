
type Datatables = {
    name: string;
    post: string;
    project: string;
    status: string;
    budget: string;
};

type SelectedRowDatatable = {
    name: string;
    post: string;
    project: string;
    status: string;
    budget: string;
    selectable:boolean
};


export type { Datatables, SelectedRowDatatable };