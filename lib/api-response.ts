import { NextResponse } from "next/server";
import type { ApiErrorBody } from "@/types/viagem";

export function jsonError(
  status: number,
  error: string,
  details?: string[],
  code?: string
): NextResponse<ApiErrorBody> {
  const body: ApiErrorBody = {
    error,
    ...(details?.length ? { details } : {}),
    ...(code ? { code } : {}),
  };
  return NextResponse.json(body, { status });
}

export function jsonOk<T>(data: T, status = 200): NextResponse<T> {
  return NextResponse.json(data, { status });
}
