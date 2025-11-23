'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ProjectCard from '@/components/ProjectCard';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const COUNTRIES = ['Sénégal', 'Bénin', 'Côte d\'Ivoire', 'Nigeria', 'Togo', 'Mali'];
const STATUSES = ['concept', 'en développement', 'live', 'archivé'];

interface Tag {
    _id: string;
    name: string;
    slug: string;
}

export default function SubmitProjectPage() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [availableTags, setAvailableTags] = useState<Tag[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [submitError, setSubmitError] = useState('');
    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const res = await api.get('/tags');
                if (res.data.success) {
                    setAvailableTags(res.data.data);
                }
            } catch (err) {
                console.error('Error fetching tags:', err);
            }
        };
        fetchTags();
    }, []);

    // Watch fields for preview
    const watchAllFields = watch();

    const onSubmit = async (data: any) => {
        setIsSubmitting(true);
        setSubmitError('');

        try {
            // Format data for API
            const projectData = {
                ...data,
                tags: selectedTags,
            };

            const res = await api.post('/projects', projectData);
            if (res.data.success) {
                alert('Projet soumis avec succès !');
                router.push('/projects');
            }
        } catch (err: any) {
            setSubmitError(err.response?.data?.error || 'Une erreur est survenue lors de la soumission');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleTagToggle = (tagId: string) => {
        setSelectedTags(prev =>
            prev.includes(tagId)
                ? prev.filter(id => id !== tagId)
                : [...prev, tagId]
        );
    };

    // Mock preview data based on form input
    const previewProject = {
        _id: 'preview',
        title: watchAllFields.title || 'Titre du projet',
        summary: watchAllFields.summary || 'Résumé du projet...',
        imageUrl: watchAllFields.imageUrl || 'https://via.placeholder.com/600x400?text=Image+Projet',
        country: watchAllFields.country || 'Pays',
        tags: availableTags.filter(t => selectedTags.includes(t._id)).map(t => t.name), // Map IDs to names for preview
        heartCount: 0,
        isLiked: false,
        submitter: user ? { username: user.username, avatarUrl: user.avatarUrl } : undefined
    };

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="md:flex md:gap-x-8">
                    {/* Form Section */}
                    <div className="md:w-2/3">
                        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                            <div className="px-4 py-6 sm:p-8">
                                <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight mb-8">
                                    Soumettre un projet
                                </h1>
                                {submitError && (
                                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6 text-sm">
                                        {submitError}
                                    </div>
                                )}
                                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-4">
                                        <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                            Titre du projet
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                id="title"
                                                {...register('title', { required: 'Titre requis' })}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message as string}</p>}
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                            Pays
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                id="country"
                                                {...register('country', { required: 'Pays requis' })}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            >
                                                <option value="">Sélectionner un pays</option>
                                                {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                                            </select>
                                            {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message as string}</p>}
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="status" className="block text-sm font-medium leading-6 text-gray-900">
                                            Statut
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                id="status"
                                                {...register('status', { required: 'Statut requis' })}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            >
                                                <option value="">Sélectionner un statut</option>
                                                {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                                            </select>
                                            {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status.message as string}</p>}
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="summary" className="block text-sm font-medium leading-6 text-gray-900">
                                            Résumé court (max 200 caractères)
                                        </label>
                                        <div className="mt-2">
                                            <textarea
                                                id="summary"
                                                rows={3}
                                                {...register('summary', { required: 'Résumé requis', maxLength: { value: 200, message: 'Max 200 caractères' } })}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            {errors.summary && <p className="text-red-500 text-xs mt-1">{errors.summary.message as string}</p>}
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                            Description complète (Markdown supporté)
                                        </label>
                                        <div className="mt-2">
                                            <textarea
                                                id="description"
                                                rows={10}
                                                {...register('description', { required: 'Description requise' })}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message as string}</p>}
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="imageUrl" className="block text-sm font-medium leading-6 text-gray-900">
                                            URL de l'image de couverture
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="url"
                                                id="imageUrl"
                                                {...register('imageUrl', { required: 'URL image requise' })}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            {errors.imageUrl && <p className="text-red-500 text-xs mt-1">{errors.imageUrl.message as string}</p>}
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="projectUrl" className="block text-sm font-medium leading-6 text-gray-900">
                                            URL du projet (Démo)
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="url"
                                                id="projectUrl"
                                                {...register('projectUrl', { required: 'URL projet requise' })}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            {errors.projectUrl && <p className="text-red-500 text-xs mt-1">{errors.projectUrl.message as string}</p>}
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="githubUrl" className="block text-sm font-medium leading-6 text-gray-900">
                                            URL GitHub (Optionnel)
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="url"
                                                id="githubUrl"
                                                {...register('githubUrl')}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="tags" className="block text-sm font-medium leading-6 text-gray-900">
                                            Tags
                                        </label>
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {availableTags.length > 0 ? (
                                                availableTags.map(tag => (
                                                    <button
                                                        key={tag._id}
                                                        type="button"
                                                        onClick={() => handleTagToggle(tag._id)}
                                                        className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ring-1 ring-inset transition-colors ${selectedTags.includes(tag._id)
                                                                ? 'bg-indigo-600 text-white ring-indigo-600'
                                                                : 'bg-gray-50 text-gray-600 ring-gray-500/10 hover:bg-gray-100'
                                                            }`}
                                                    >
                                                        {tag.name}
                                                    </button>
                                                ))
                                            ) : (
                                                <p className="text-sm text-gray-500">Chargement des tags...</p>
                                            )}
                                        </div>
                                        <input type="hidden" {...register('tags')} value={selectedTags.join(',')} />
                                    </div>
                                </form>
                    </div>
                    <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                            Annuler
                        </button>
                        <button
                            type="submit"
                            onClick={handleSubmit(onSubmit)}
                            disabled={isSubmitting}
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
                        >
                            {isSubmitting ? 'Envoi...' : 'Soumettre le projet'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Preview Section */}
            <div className="md:w-1/3 mt-8 md:mt-0">
                <div className="sticky top-24">
                    <h2 className="text-lg font-semibold leading-7 text-gray-900 mb-4">Prévisualisation</h2>
                    <ProjectCard {...previewProject} />
                    <p className="mt-4 text-sm text-gray-500">
                        Voici comment votre projet apparaîtra dans la liste.
                    </p>
                </div>
            </div>
        </div>
            </div >
        </div >
    );
}
