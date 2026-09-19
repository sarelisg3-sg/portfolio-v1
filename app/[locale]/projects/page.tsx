import { redirect } from "next/navigation";

/** `/<locale>/projects` has no index page of its own: send visitors to the projects grid on the home page. */
export default async function ProjectsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}#projects`);
}
