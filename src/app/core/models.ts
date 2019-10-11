export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt?: number;
  updatedAt?: number;
}

export interface AuthData {
  data: {
    user: User;
    token: string;
  };
  success?: boolean;
  error?: boolean;
}

export interface Board {
    _id?: string;
    title: string;
    users: User[];
    columns: any[];
    createdAt: number;
    updatedAt: number;
}

export const mockUser = {
  _id: 'user-1',
  name: 'Tanya Agisheva',
  email: 'test@test.com'
};

export const  mockResponse = {
  error: false,
  data: {
    user: mockUser,
    token: 'token'
  }
};

export const mockBoard = {
  _id: 'board',
  title: 'board title',
  users: [mockUser],
  columns: [],
  createdAt: Date.now(),
  updatedAt: Date.now()
};

export const mockBoards = [
  mockBoard,
  {
    ...mockBoard,
    title: 'board title 1',
    _id: 'board1',
    users: ['user-2']
  },
  {
    ...mockBoard,
    title: 'board title 2',
    _id: 'board2',
    users: ['user-2', mockUser._id]
  },
  {
    ...mockBoard,
    title: 'board title 2',
    _id: 'board3',
    users: ['user-2', mockUser._id]
  },
  {
    ...mockBoard,
    title: 'board title 2',
    _id: 'board4',
    users: ['user-2', mockUser._id]
  },
  {
    ...mockBoard,
    title: 'board title 2',
    _id: 'board5',
    users: ['user-2', mockUser._id]
  },
  {
    ...mockBoard,
    title: 'board title 2',
    _id: 'board6',
    users: ['user-2', mockUser._id]
  },
  {
    ...mockBoard,
    title: 'board title 2',
    _id: 'board7',
    users: ['user-2', mockUser._id]
  },
  {
    ...mockBoard,
    title: 'board title 2',
    _id: 'board8',
    users: ['user-2', mockUser._id]
  },
  {
    ...mockBoard,
    title: 'board title 2',
    _id: 'board2',
    users: ['user-2', mockUser._id]
  },
  {
    ...mockBoard,
    title: 'board title 2',
    _id: 'board9',
    users: ['user-2', mockUser._id]
  },
  {
    ...mockBoard,
    title: 'board title 2',
    _id: 'board10',
    users: ['user-2', mockUser._id]
  },
  {
    ...mockBoard,
    title: 'board title 2',
    _id: 'board11',
    users: ['user-2', mockUser._id]
  }
];
