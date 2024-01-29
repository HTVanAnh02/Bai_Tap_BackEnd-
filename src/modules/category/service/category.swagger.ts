export const createCategorySuccessResponseExample = {
    createdAt: Date.now.toString(),
    updatedAt: Date.now.toString(),
    deletedAt: null,
    deletedBy: null,
    updatedBy: null,
    createdBy: null,
    name: 'Category name 1',
    _id: '659e7592b3b56d0946b3c7b5',
    __v: 0,
    id: '659e7592b3b56d0946b3c7b5',
};

export const updateCategorySuccessResponseExample = {
    _id: '659e7592b3b56d0946b3c7b5',
    name: 'new name',
    id: '659e7592b3b56d0946b3c7b5',
};

export const deleteCategorySuccessResponseExample = {
    id: '659e7592b3b56d0946b3c7b5',
};

export const getCategoryDetailSuccessResponseExample = {
    _id: '659e7592b3b56d0946b3c7b5',
    name: 'new name',
    id: '659e7592b3b56d0946b3c7b5',
};

export const getCategoryListSuccessResponseExample = {
    totalItems: 1,
    items: [
        {
            _id: '659e7592b3b56d0946b3c7b5',
            createdAt: '2024-01-10T10:46:42.037Z',
            updatedAt: '2024-01-10T10:47:59.566Z',
            name: 'new name',
            id: '659e7592b3b56d0946b3c7b5',
        },
    ],
};
