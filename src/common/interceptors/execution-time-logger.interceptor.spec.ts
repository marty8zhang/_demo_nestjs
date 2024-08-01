import { ExecutionTimeLoggerInterceptor } from './execution-time-logger.interceptor';

describe('ExecutionTimeLoggerInterceptor', () => {
  it('should be defined', () => {
    expect(new ExecutionTimeLoggerInterceptor()).toBeDefined();
  });
});
