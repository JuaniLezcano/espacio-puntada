import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site-config";
import { workshops } from "@/data/workshops";
import { students } from "@/data/students";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/clases",
    "/workshops",
    "/alumnas",
    "/sobre-nosotros",
    "/contacto",
  ].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
  }));

  const workshopRoutes = workshops.map((workshop) => ({
    url: `${siteConfig.url}/workshops/${workshop.slug}`,
    lastModified: new Date(),
  }));

  const studentRoutes = students.map((student) => ({
    url: `${siteConfig.url}/alumnas/${student.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...workshopRoutes, ...studentRoutes];
}
