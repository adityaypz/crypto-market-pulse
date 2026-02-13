import { getAllSnapshots } from '../../../lib/storage/history';

export async function GET() {
    try {
        const snapshots = getAllSnapshots();
        return Response.json({ snapshots });
    } catch (error) {
        console.error('[History API] Error:', error);
        return Response.json({ snapshots: [] });
    }
}
