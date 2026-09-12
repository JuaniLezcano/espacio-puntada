import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site-config";
import { prisma } from "@/lib/prisma";
import { students } from "@/data/students";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const workshops = await prisma.workshop.findMany();
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
