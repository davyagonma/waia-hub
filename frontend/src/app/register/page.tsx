'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { useState } from 'react';

export default function RegisterPage() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const password = watch('password');
    const { register: registerUser } = useAuth();
    const [registerError, setRegisterError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        setRegisterError('');
        try {
            const res = await api.post('/auth/register', data);
            if (res.data.success) {
                const token = res.data.token;
                localStorage.setItem('token', token);

                const meRes = await api.get('/auth/me', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (meRes.data.success) {
                    registerUser(token, meRes.data.data);
                }
            }
        } catch (err: any) {
            setRegisterError(err.response?.data?.error || 'Une erreur est survenue');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white h-screen">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Créer un compte
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                {registerError && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4 text-sm">
                        {registerError}
                    </div>
                )}
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                            Nom d'utilisateur
                        </label>
                        <div className="mt-2">
                            <input
                                id="username"
                                type="text"
                                {...register('username', { required: 'Nom d\'utilisateur requis' })}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message as string}</p>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Adresse email
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                type="email"
                                {...register('email', { required: 'Email requis', pattern: { value: /^\S+@\S+$/i, message: 'Email invalide' } })}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message as string}</p>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Mot de passe
                        </label>
                        <div className="mt-2">
                            <input
                                id="password"
                                type="password"
                                {...register('password', { required: 'Mot de passe requis', minLength: { value: 6, message: 'Minimum 6 caractères' } })}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message as string}</p>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                            Confirmer le mot de passe
                        </label>
                        <div className="mt-2">
                            <input
                                id="confirmPassword"
                                type="password"
                                {...register('confirmPassword', {
                                    required: 'Confirmation requise',
                                    validate: value => value === password || 'Les mots de passe ne correspondent pas'
                                })}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message as string}</p>}
                        </div>
                    </div>

                    <div>
                        <button
                            disabled={isLoading}
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
                        >
                            {isLoading ? 'Inscription...' : 'S\'inscrire'}
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Déjà membre ?{' '}
                    <Link href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Connectez-vous
                    </Link>
                </p>
            </div>
        </div>
    );
}
