export const dtoToEntity = <T>(entity: T, dto: Partial<T>): T => {
  for (const prop in dto) {
    const propValue = dto[prop];
    if (propValue != null && Object.hasOwnProperty.call(dto, prop)) {
      entity[prop] = propValue;
    }
  }
  return entity;
}
