import { NextResponse } from "next/server";
import type { ApiErrorBody } from "@/types/viagem";

export function jsonError(
  status: number,
  error: string,
  details?: string[]
): NextResponse<ApiErrorBody> {
  const body: ApiErrorBody = details?.length ? { error, details } : { error };
  return NextResponse.json(body, { status });
}

export function jsonOk<T>(data: T, status = 200): NextResponse<T> {
  return NextResponse.json(data, { status });
}
