export const dtoToEntity = <T>(entity: T, dto: Partial<T>, excludes?: string[]): T => {
  for (const prop in dto) {
    if (!excludes || !excludes.find((ele) => ele === prop)) {
      const propValue = dto[prop];
      if (propValue != null && Object.hasOwnProperty.call(dto, prop)) {
        entity[prop] = propValue;
      }
    }
  }
  return entity;
}
