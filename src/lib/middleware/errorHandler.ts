import { NextResponse } from 'next/server'
import { AppError } from '../exceptions/AppError'
import { logError } from '../utils/logger'

export async function errorHandler(error: Error) {
  // 记录错误日志
  logError('Error occurred:', error);

  // 处理已知的操作性错误
  if (error instanceof AppError) {
    return NextResponse.json(
      {
        status: 'error',
        message: error.message,
      },
      { status: error.statusCode }
    );
  }

  // 处理未知错误
  return NextResponse.json(
    {
      status: 'error',
      message: 'Internal Server Error',
    },
    { status: 500 }
  );
} 