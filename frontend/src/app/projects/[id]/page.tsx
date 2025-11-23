import { notFound } from 'next/navigation';
import Link from 'next/link';
import { HeartIcon, ShareIcon, CodeBracketIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

// Mock data - same as in projects page for consistency
const MOCK_PROJECTS = [
    {
        id: '1',
        title: 'AgriAI Senegal',
        summary: 'Une solution d\'IA pour optimiser les rendements agricoles au Sénégal en analysant les sols.',
        description: `
# AgriAI Senegal

AgriAI Senegal est une initiative pionnière visant à transformer l'agriculture au Sénégal grâce à l'intelligence artificielle. Notre solution utilise des drones équipés de caméras multispectrales pour analyser la santé des cultures et la composition des sols.

## Fonctionnalités

- **Analyse des sols** : Détection des carences en nutriments.
- **Surveillance des cultures** : Identification précoce des maladies et ravageurs.
- **Optimisation de l'irrigation** : Recommandations personnalisées pour l'arrosage.

## Impact

Nous avons déjà aidé plus de 500 agriculteurs à augmenter leurs rendements de 30% en moyenne tout en réduisant leur consommation d'eau de 20%.
    `,
        imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
        country: 'Sénégal',
        tags: ['Agriculture', 'Vision par ordinateur'],
        heartCount: 120,
        status: 'live',
        createdAt: '2023-01-01',
        projectUrl: 'https://example.com',
        githubUrl: 'https://github.com',
        reviews: [
            { id: 1, user: 'Amadou', rating: 5, comment: 'Incroyable initiative !', date: '2023-05-10' },
            { id: 2, user: 'Sophie', rating: 4, comment: 'Très utile pour les petits exploitants.', date: '2023-06-12' },
        ]
    },
    // Add other projects if needed for SSG testing
];

export async function generateStaticParams() {
    return MOCK_PROJECTS.map((project) => ({
        id: project.id,
    }));
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
    const project = MOCK_PROJECTS.find((p) => p.id === params.id);

    if (!project) {
        notFound();
    }

    return (
        <div className="bg-white min-h-screen pb-24">
            {/* Header / Cover */}
            <div className="relative h-96 w-full">
                <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="inline-flex items-center rounded-md bg-indigo-600/90 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-indigo-500/20">
                            {project.country}
                        </span>
                        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${project.status === 'live' ? 'bg-green-500/20 text-green-100 ring-green-500/30' : 'bg-yellow-500/20 text-yellow-100 ring-yellow-500/30'
                            }`}>
                            {project.status}
                        </span>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">{project.title}</h1>
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                            <span key={tag} className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    <div className="prose prose-lg prose-indigo max-w-none">
                        <p className="lead text-xl text-gray-600 mb-8">{project.summary}</p>
                        <div className="whitespace-pre-wrap font-sans text-gray-700">
                            {project.description}
                        </div>
                    </div>

                    {/* Reviews Section */}
                    <div className="mt-16 border-t border-gray-200 pt-10">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Avis de la communauté</h2>
                        <div className="mt-8 space-y-8">
                            {project.reviews.map((review) => (
                                <div key={review.id} className="flex gap-x-4 rounded-xl bg-gray-50 p-6">
                                    <div className="flex-auto">
                                        <div className="flex items-baseline justify-between gap-x-4">
                                            <h3 className="text-base font-semibold leading-7 text-gray-900">{review.user}</h3>
                                            <p className="text-sm leading-6 text-gray-600">{review.date}</p>
                                        </div>
                                        <div className="flex items-center gap-x-1 my-1">
                                            {[...Array(5)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                                                </svg>
                                            ))}
                                        </div>
                                        <p className="mt-1 text-sm leading-6 text-gray-600">{review.comment}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8">
                            <button className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                Laisser un avis <span aria-hidden="true">→</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Sidebar Actions */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 rounded-2xl bg-gray-50 p-6 shadow-sm ring-1 ring-gray-900/5">
                        <h3 className="text-base font-semibold leading-7 text-gray-900">Actions</h3>
                        <div className="mt-6 space-y-4">
                            <a
                                href={project.projectUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex w-full items-center justify-center gap-3 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                <GlobeAltIcon className="h-5 w-5" />
                                Voir la Démo
                            </a>
                            {project.githubUrl && (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                >
                                    <CodeBracketIcon className="h-5 w-5 text-gray-500" />
                                    Voir le Code
                                </a>
                            )}
                            <button
                                type="button"
                                className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                                <HeartIcon className="h-5 w-5 text-red-500" />
                                J'aime ce projet ({project.heartCount})
                            </button>
                            <button
                                type="button"
                                className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                                <ShareIcon className="h-5 w-5 text-gray-500" />
                                Partager
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
