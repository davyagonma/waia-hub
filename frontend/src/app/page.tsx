import Link from 'next/link';
import ProjectCard from '@/components/ProjectCard';

// Mock data for now
const recentProjects = [
  {
    id: '1',
    title: 'AgriAI Senegal',
    summary: 'Une solution d\'IA pour optimiser les rendements agricoles au Sénégal en analysant les sols.',
    imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    country: 'Sénégal',
    tags: ['Agriculture', 'Vision par ordinateur'],
    heartCount: 120,
    isLiked: true,
  },
  {
    id: '2',
    title: 'HealthConnect Benin',
    summary: 'Plateforme de télémédecine utilisant l\'IA pour le pré-diagnostic dans les zones rurales.',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    country: 'Bénin',
    tags: ['Santé', 'NLP'],
    heartCount: 85,
    isLiked: false,
  },
  {
    id: '3',
    title: 'EduTech Ivory',
    summary: 'Assistant pédagogique personnalisé pour les élèves du secondaire en Côte d\'Ivoire.',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1744&q=80',
    country: 'Côte d\'Ivoire',
    tags: ['Éducation', 'Chatbot'],
    heartCount: 200,
    isLiked: false,
  },
];

const popularTags = ['Santé', 'Agriculture', 'Finance', 'Éducation', 'NLP', 'Vision par ordinateur'];

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              L'innovation IA en <span className="text-indigo-600">Afrique de l'Ouest</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Découvrez, partagez et collaborez sur des projets d'intelligence artificielle qui transforment notre région. Rejoignez la communauté WAIA Hub.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/projects"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Découvrir les projets
              </Link>
              <Link href="/submit" className="text-sm font-semibold leading-6 text-gray-900">
                Soumettre un projet <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Projects Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Projets Récents</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Les dernières innovations ajoutées par la communauté.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {recentProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/projects" className="text-sm font-semibold leading-6 text-indigo-600">
            Voir tous les projets <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      {/* Popular Tags Section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Thématiques Populaires</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Explorez les projets par domaine d'application.
            </p>
          </div>
          <div className="mx-auto mt-10 flex flex-wrap justify-center gap-4">
            {popularTags.map((tag) => (
              <Link
                key={tag}
                href={`/projects?tag=${tag}`}
                className="rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
