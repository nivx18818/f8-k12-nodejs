const pagination = (items, total, page, limit) => {
  return {
    items,
    pagination: {
      currentPage: Number(page),
      limit,
      total,
      lastPage: Math.ceil(total / limit),
    },
  };
};
