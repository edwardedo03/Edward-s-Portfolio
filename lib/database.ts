import supabase from "./supabase-client";
import type { PersonalData, Project, Certificate } from "./portfolio-content";

export async function getPersonalData(): Promise<PersonalData | null> {
  const { data, error } = await supabase
    .from("personal_data")
    .select("*")
    .order("id_edward", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw error;

  return (data as PersonalData | null) ?? null;
}

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*, project_images (id, id_project, image_url, image_name, sort)")
    .order("start_date", { ascending: true })
    .order("sort", { referencedTable: "project_images", ascending: true });

  if (error) throw error;

  return (data as Project[] | null) ?? [];
}

export async function getCertificates(): Promise<Certificate[]> {
  const { data, error } = await supabase
    .from("certificates")
    .select("*")
    .order("date_obtained", { ascending: false });

  if (error) throw error;

  return (data as Certificate[] | null) ?? [];
}
