'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login } = useAuth();
    const [loginError, setLoginError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        setLoginError('');
        try {
            const res = await api.post('/auth/login', data);
            if (res.data.success) {
                // Decode token or just use the user object if returned (backend returns token only usually, but let's check controller)
                // Controller: sendTokenResponse(user, 200, res) -> returns { success: true, token }
                // Wait, the controller only returns the token! It doesn't return the user object in the login response.
                // I need to fetch the user or decode the token.
                // Actually, let's check the controller again.
                // exports.login calls sendTokenResponse.
                // sendTokenResponse sends { success: true, token }.
                // It does NOT send the user object.
                // So I need to fetch /auth/me after login or decode the token.
                // Or I can modify the backend to send the user object.
                // Since I can't modify backend easily (I should stick to frontend if possible, but I have access to backend code),
                // I will fetch /auth/me after getting the token.

                const token = res.data.token;
                localStorage.setItem('token', token); // Set token temporarily to fetch me

                // Fetch user details
                const meRes = await api.get('/auth/me', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (meRes.data.success) {
                    login(token, meRes.data.data);
                }
            }
        } catch (err: any) {
            setLoginError(err.response?.data?.error || 'Une erreur est survenue');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white h-screen">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Connectez-vous à votre compte
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                {loginError && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4 text-sm">
                        {loginError}
                    </div>
                )}
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Adresse email
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                type="email"
                                autoComplete="email"
                                {...register('email', { required: 'Email requis' })}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message as string}</p>}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Mot de passe
                            </label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Mot de passe oublié ?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                type="password"
                                autoComplete="current-password"
                                {...register('password', { required: 'Mot de passe requis' })}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message as string}</p>}
                        </div>
                    </div>

                    <div>
                        <button
                            disabled={isLoading}
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
                        >
                            {isLoading ? 'Connexion...' : 'Se connecter'}
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Pas encore membre ?{' '}
                    <Link href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Créez un compte
                    </Link>
                </p>
            </div>
        </div>
    );
}
