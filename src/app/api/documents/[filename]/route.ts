import { readFile } from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;
  const safeName = path.basename(filename);

  if (!safeName.endsWith('.pdf')) {
    return NextResponse.json({ error: 'Document not found' }, { status: 404 });
  }

  try {
    const filePath = path.join(process.cwd(), 'public', 'assets', 'documents', safeName);
    const buffer = await readFile(filePath);

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Length': String(buffer.byteLength),
        'Content-Disposition': `inline; filename="${safeName}"`,
        'Cache-Control': 'private, max-age=3600',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Document not found' }, { status: 404 });
  }
}
