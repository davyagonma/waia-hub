import Link from 'next/link';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

interface ProjectCardProps {
    id: string;
    title: string;
    summary: string;
    imageUrl: string;
    country: string;
    tags: string[];
    heartCount: number;
    isLiked?: boolean;
}

export default function ProjectCard({
    id,
    title,
    summary,
    imageUrl,
    country,
    tags,
    heartCount,
    isLiked = false,
}: ProjectCardProps) {
    return (
        <div className="flex flex-col overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-[1.02] hover:shadow-xl bg-white">
            <div className="flex-shrink-0">
                <img className="h-48 w-full object-cover" src={imageUrl} alt={title} />
            </div>
            <div className="flex flex-1 flex-col justify-between p-6">
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-indigo-600">
                            {country}
                        </p>
                        <div className="flex items-center space-x-1 text-gray-500">
                            {isLiked ? (
                                <HeartIconSolid className="h-5 w-5 text-red-500" />
                            ) : (
                                <HeartIcon className="h-5 w-5" />
                            )}
                            <span className="text-sm">{heartCount}</span>
                        </div>
                    </div>
                    <Link href={`/projects/${id}`} className="mt-2 block">
                        <p className="text-xl font-semibold text-gray-900">{title}</p>
                        <p className="mt-3 text-base text-gray-500 line-clamp-3">{summary}</p>
                    </Link>
                </div>
                <div className="mt-6">
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
