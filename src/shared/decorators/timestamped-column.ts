import { Column } from 'typeorm';
import { EntityTimestamp } from '../entities/timestamp.entity';

export function TimestampColumn() {
  return Column((type) => EntityTimestamp, { prefix: false });
}
