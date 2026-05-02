export interface Project {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    title: string;
    thumbnail: string; // File ID
    live_url: string;
    description: string;
    is_public: boolean;
    status: 'ongoing' | 'completed';
    category: string;
    tags: string[];
}

export type CreateProjectData = Omit<Project, '$id' | '$createdAt' | '$updatedAt' | 'thumbnail'>;

export interface Review {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    name: string;
    review: string;
    rating: number;
    is_published: boolean;
}
