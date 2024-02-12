import mock from '../../mockAdapter';

interface NotesType {
    id?: number | any;
    color?: string;
    title?: string;
    datef?: string | Date;
}

const NotesData: NotesType[] = [
    {
        id: 1,
        color: 'primary',
        title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        datef: '2023-06-03T23:28:56.782Z'
    },
    {
        id: 2,
        color: 'error',
        title: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,',
        datef: '2023-06-02T23:28:56.782Z'
    },
    {
        id: 3,
        color: 'warning',
        title: 'consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?',
        datef: '2023-06-01T23:28:56.782Z'
    },
    {
        id: 4,
        color: 'success',
        title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        datef: '2023-06-03T23:28:56.782Z'
    }
];

interface colorVariationType {
    id?: number;
    color?: string;
}

export const colorVariation: colorVariationType[] = [
    {
        id: 1,
        color: 'warning'
    },
    {
        id: 2,
        color: 'secondary'
    },
    {
        id: 3,
        color: 'error'
    },
    {
        id: 4,
        color: 'success'
    },
    {
        id: 5,
        color: 'primary'
    }
];

mock.onGet('/api/data/notes/NotesData').reply(() => {
    return [200, NotesData];
});
export default NotesData;
