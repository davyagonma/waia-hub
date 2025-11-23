'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ProjectCard from '@/components/ProjectCard';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';

// Mock data
const MOCK_PROJECTS = [
    {
        id: '1',
        title: 'AgriAI Senegal',
        summary: 'Une solution d\'IA pour optimiser les rendements agricoles au Sénégal en analysant les sols.',
        imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
        country: 'Sénégal',
        tags: ['Agriculture', 'Vision par ordinateur'],
        heartCount: 120,
        status: 'live',
        createdAt: '2023-01-01',
    },
    {
        id: '2',
        title: 'HealthConnect Benin',
        summary: 'Plateforme de télémédecine utilisant l\'IA pour le pré-diagnostic dans les zones rurales.',
        imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
        country: 'Bénin',
        tags: ['Santé', 'NLP'],
        heartCount: 85,
        status: 'en développement',
        createdAt: '2023-02-15',
    },
    {
        id: '3',
        title: 'EduTech Ivory',
        summary: 'Assistant pédagogique personnalisé pour les élèves du secondaire en Côte d\'Ivoire.',
        imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1744&q=80',
        country: 'Côte d\'Ivoire',
        tags: ['Éducation', 'Chatbot'],
        heartCount: 200,
        status: 'live',
        createdAt: '2023-03-10',
    },
    {
        id: '4',
        title: 'FinTech Lagos',
        summary: 'Détection de fraude bancaire en temps réel utilisant le Machine Learning.',
        imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
        country: 'Nigeria',
        tags: ['Finance', 'ML'],
        heartCount: 150,
        status: 'concept',
        createdAt: '2023-04-05',
    },
];

const COUNTRIES = ['Sénégal', 'Bénin', 'Côte d\'Ivoire', 'Nigeria', 'Togo', 'Mali'];
const TAGS = ['Agriculture', 'Santé', 'Éducation', 'Finance', 'NLP', 'Vision par ordinateur', 'ML', 'Chatbot'];
const STATUSES = ['concept', 'en développement', 'live', 'archivé'];

export default function ProjectsPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [projects, setProjects] = useState(MOCK_PROJECTS);
    const [filteredProjects, setFilteredProjects] = useState(MOCK_PROJECTS);
    const [showFilters, setShowFilters] = useState(false);

    // Filter states
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [selectedCountry, setSelectedCountry] = useState(searchParams.get('country') || '');
    const [selectedTag, setSelectedTag] = useState(searchParams.get('tag') || '');
    const [selectedStatus, setSelectedStatus] = useState(searchParams.get('status') || '');
    const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest');

    // Update URL when filters change
    useEffect(() => {
        const params = new URLSearchParams();
        if (search) params.set('search', search);
        if (selectedCountry) params.set('country', selectedCountry);
        if (selectedTag) params.set('tag', selectedTag);
        if (selectedStatus) params.set('status', selectedStatus);
        if (sortBy) params.set('sort', sortBy);

        router.replace(`/projects?${params.toString()}`);
    }, [search, selectedCountry, selectedTag, selectedStatus, sortBy, router]);

    // Filter and sort projects
    useEffect(() => {
        let result = [...projects];

        if (search) {
            const lowerSearch = search.toLowerCase();
            result = result.filter(p =>
                p.title.toLowerCase().includes(lowerSearch) ||
                p.summary.toLowerCase().includes(lowerSearch)
            );
        }

        if (selectedCountry) {
            result = result.filter(p => p.country === selectedCountry);
        }

        if (selectedTag) {
            result = result.filter(p => p.tags.includes(selectedTag));
        }

        if (selectedStatus) {
            result = result.filter(p => p.status === selectedStatus);
        }

        // Sorting
        if (sortBy === 'newest') {
            result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        } else if (sortBy === 'popular') {
            result.sort((a, b) => b.heartCount - a.heartCount);
        }

        setFilteredProjects(result);
    }, [projects, search, selectedCountry, selectedTag, selectedStatus, sortBy]);

    return (
        <div className="bg-white min-h-screen">
            <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Découvrir les Projets</h1>

                    <div className="mt-4 md:mt-0 flex items-center space-x-4">
                        <div className="relative rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                type="text"
                                className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Rechercher..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <button
                            type="button"
                            className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <FunnelIcon className="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                            Filtres
                        </button>
                        <select
                            className="block rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="newest">Plus récents</option>
                            <option value="popular">Plus populaires</option>
                        </select>
                    </div>
                </div>

                {showFilters && (
                    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3 bg-gray-50 p-4 rounded-lg">
                        <div>
                            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">Pays</label>
                            <select
                                id="country"
                                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={selectedCountry}
                                onChange={(e) => setSelectedCountry(e.target.value)}
                            >
                                <option value="">Tous les pays</option>
                                {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="tag" className="block text-sm font-medium leading-6 text-gray-900">Thématique</label>
                            <select
                                id="tag"
                                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={selectedTag}
                                onChange={(e) => setSelectedTag(e.target.value)}
                            >
                                <option value="">Toutes les thématiques</option>
                                {TAGS.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium leading-6 text-gray-900">Statut</label>
                            <select
                                id="status"
                                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                            >
                                <option value="">Tous les statuts</option>
                                {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.id} {...project} />
                    ))}
                </div>

                {filteredProjects.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">Aucun projet ne correspond à vos critères.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
