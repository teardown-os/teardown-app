import { teardown } from "@/_sdk";
import { useAuth } from "@/_sdk/modules/auth";
import type { Organisation } from "@/_sdk/modules/organisations/organisation";
import type React from "react";
import { createContext, useContext, useState } from "react";

interface OrganisationContextType {
  selectedOrganisation: Organisation | null;
  organisations: Organisation[];
  setSelectedOrganisation: (org: Organisation | null) => void;
  isLoading: boolean;
}

const OrganisationContext = createContext<OrganisationContextType | null>(null);

export const useOrganisation = () => {
  const context = useContext(OrganisationContext);
  if (!context) {
    throw new Error(
      "useOrganisation must be used within an OrganisationProvider",
    );
  }
  return context;
};

export const OrganisationProvider = ({
  children,
}: { children: React.ReactNode }) => {

  const [selectedOrganisation, setSelectedOrganisation] =
    useState<Organisation | null>(null);
  const session = useAuth();

  const { data: organisations = [], isLoading, error } =
    teardown.organisations.queries.useOrganisations({
      enabled: session != null,
    });

  if (error) {
    console.error("Organisations error", error);
  }

  // useEffect(() => {
  //   // Auto-select first organization if there's only one
  //   if (organisations.length === 1 && !selectedOrganisation) {
  //     setSelectedOrganisation(organisations[0]);
  //   }
  // }, [organisations, selectedOrganisation]);

  return (
    <OrganisationContext.Provider
      value={{
        selectedOrganisation,
        organisations,
        setSelectedOrganisation,
        isLoading,
      }}
    >
      {children}
    </OrganisationContext.Provider>
  );
};
