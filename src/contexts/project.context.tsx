import { teardown } from "@/_sdk";
import type { Project } from "@/_sdk/modules/projects/project";
import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { useOrganisation } from "./organisation.context";

interface ProjectContextType {
  selectedProject: Project | null;
  projects: Project[];
  setSelectedProject: (project: Project | null) => void;
  isLoading: boolean;
}

const ProjectContext = createContext<ProjectContextType | null>(null);

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error(
      "useProject must be used within a ProjectProvider",
    );
  }
  return context;
};

export const ProjectProvider = ({
  children,
}: { children: React.ReactNode }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { selectedOrganisation } = useOrganisation();
  const organisationId = selectedOrganisation?.id;

  const { data: projects = [], isLoading } = teardown.projects.queries.useProjects(
    organisationId ?? null
  );

  // Reset selected project when organization changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: We want to reset the selected project when the organisation changes
  useEffect(() => {
    setSelectedProject(null);
  }, [organisationId]);

  // useEffect(() => {
  //   if (projects.length === 1 && !selectedProject && selectedOrganisation) {
  //     setSelectedProject(projects[0]);
  //   }
  // }, [projects, selectedProject, selectedOrganisation]);

  return (
    <ProjectContext.Provider
      value={{
        selectedProject,
        projects,
        setSelectedProject,
        isLoading,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}; 