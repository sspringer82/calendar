it('should throw NotFoundException if appointment not found', async () => {
  const id = 1;
  const userId = 2;

  jest.spyOn(repository, 'findOneOrFail').mockRejectedValue(new Error());

  await expect(service.getOne(id, userId)).rejects.toThrow(NotFoundException);
});
