export interface Post {
  id: string;
  slug: string;

  publishDate: Date;
  title: string;
  description?: string;

  image: Image;

  canonical?: string | URL;
  permalink?: string;

  draft?: boolean;

  excerpt?: string;
  category?: string;
  tags?: Array<string>;
  author?: string;

  Content?: unknown;
  content?: string;
}

export interface Image {
  id: number,
  alt: string,
  name: string,
  focus: string,
  title: string,
  source: string,
  filename: string,
  copyright: string,
  fieldtype: string,
  meta_data: object,
  is_external_url: false
}

export interface MetaSEO {
  title?: string;
  description?: string;
  image?: string;

  canonical?: string | URL;
  noindex?: boolean;
  nofollow?: boolean;

  ogTitle?: string;
  ogType?: string;
}
