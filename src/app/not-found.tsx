'use server';
import Link from 'next/link';

export default async function NotFound() {
    return (
        <main className="flex h-full flex-col items-center justify-center gap-2">
            <h2 className="text-xl font-semibold">Page inaccessible</h2>
            <Link
                href="/"
                className="mt-4 rounded-md bg-orange-500 px-4 py-2 text-sm text-white transition-colors hover:bg-orange-400"
            >
                Retour à la page d'accueil
            </Link>
        </main>
    );
}