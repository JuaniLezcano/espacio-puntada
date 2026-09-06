export interface ProjectPhoto {
  src: string;
  alt: string;
  caption?: string;
}

export type StudentRelation =
  | { type: "workshop"; slug: string }
  | { type: "clases-regulares" };

export interface Student {
  slug: string;
  name: string;
  coverImage: string;
  photos: ProjectPhoto[];
  projectTitle: string;
  projectDescription: string;
  relatedTo: StudentRelation;
  testimonial?: string;
  featured?: boolean;
}
